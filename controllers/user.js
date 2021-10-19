const express = require('express')
const bcrypt = require('bcrypt')

const { models } = require('../sequelize.js')
const { Op } = require('sequelize')

const { createToken, retrieveToken, decodeToken } = require('../utils/auth')
const upload = require('../utils/upload')
const avatarUpload = upload.single('avatar')

const scrub = ({ password, ...user }) => user

const apiRouter = express.Router()

apiRouter.post('/login', async (req, res) => {
  const { username, password } = req.body

  // Get User by Username or Email
  const user = await models.User.findOne({
    where: {
      [Op.or]: [
        { username },
        { email: username }
      ]
    }
  })

  // Return unauthorized if no user found
  if (!user) {
    return res.status(401).json({ error: 'invalid user or password' })
  }
  console.log('Got User', user)

  // Authorize password
  if (bcrypt.compareSync(password, user.password)) {
    console.log("password is good")

    // Generate token
    const token = createToken(user)

    // Return user info
    return res.status(200).json({ token, user: scrub(user.toJSON()) })
  }

  // Return 401 if password is bad
  return res.status(401).json({ error: 'invalid user or password' })
})

apiRouter.post('/register', async (req, res) => {
  const { username, password, firstName, lastName, email } = req.body

  // Check for existing User by email or username
  const existingUser = await models.User.findOne({
    where: {
      [Op.or]: [
        { username },
        { email }
      ]
    }
  })

  // Throw error if existing user
  if (existingUser) {
    return res.status(400).json({ error: 'Existing user with this username or email.' })
  }

  /* Encrypt password */
  const encryptedPass = bcrypt.hashSync(password, 10)

  // Create and Insert User
  const user = await models.User.create({
    username,
    password: encryptedPass,
    firstName,
    lastName,
    email
  })

  await user.save()

  // Generate token
  const token = createToken(user)

  return res.status(200).json({ token, user: scrub(user.toJSON()) })
})

apiRouter.patch('/update', async (req, res) => {
  const { username, firstName, lastName, email } = req.body
  const token = retrieveToken(req)

  if (!token) {
    return res.status(401).json({ error: 'Invalid token' })
  }

  // Get user details from token
  const userToken = decodeToken(token)

  // Get User by Username or Email
  const user = await models.User.findOne({
    where: {
      username: userToken.username
    }
  })

  if (!user) {
    return res.status(404).json({ error: 'User not found' })
  }

  // Update user
  user.username = username
  user.firstName = firstName
  user.lastName = lastName
  user.email = email

  await user.save()

  return res.status(200).json({ token, user: scrub(user.toJSON()) })
})

apiRouter.patch('/update/password', async (req, res) => {
  const { currentPassword, newPassword } = req.body

  // Validate JWT token
  const token = retrieveToken(req)
  if (!token) {
    return res.status(401).json({ error: 'Invalid token' })
  }

  // Get user details from token
  const userToken = decodeToken(token)

  // Get User by Username or Email
  const user = await models.User.findOne({
    where: {
      username: userToken.username
    }
  })

  // Return 404 if no user found by token username
  if (!user) {
    return res.status(404).json({ error: 'User not found' })
  }

  // Authorize password
  if (!bcrypt.compareSync(currentPassword, user.password)) {
    // Return 401 if password is bad
    return res.status(401).json({ error: 'Invalid password' })
  }

  /* Encrypt new password */
  const encryptedPass = bcrypt.hashSync(newPassword, 10)

  // Update user password
  user.password = encryptedPass
  await user.save()

  return res.status(200).json({ token, user: scrub(user.toJSON()) })
})

apiRouter.patch('/update/photo', async (req, res) => {
  // Validate JWT token
  const token = retrieveToken(req)
  if (!token) {
    return res.status(401).json({ error: 'Invalid token' })
  }

  // Get user details from token
  const userToken = decodeToken(token)

  // Get User by Username or Email
  const user = await models.User.findOne({
    where: {
      username: userToken.username
    }
  })

  // Return 404 if no user found by token username
  if (!user) {
    return res.status(404).json({ error: 'User not found' })
  }

  avatarUpload(req, res, async function (err) {
    if (err) {
      return res.json({
        success: false,
        errors: {
          title: 'Image Upload Error',
          detail: err.message,
          error: err,
        }
      })
    }

    // Update user photo filepath
    user.photo = req.file.location
    await user.save()

    return res.status(200).json({ token, user: scrub(user.toJSON()) })
  })
})

module.exports = apiRouter