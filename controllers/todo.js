const express = require('express')
const { retrieveToken, decodeToken } = require('../utils/auth')
const { models } = require('../sequelize.js')

const apiRouter = express.Router()

// Get todos
apiRouter.get('/', async (req, res) => {
  // Get user details from token
  const token = retrieveToken(req)
  if (token === null) {
    return res.status(401).json({ error: 'Invalid token' })
  }

  const userToken = decodeToken(token)

  // Get User by Username or Email
  const user = await models.User.findOne({
    where: {
      username: userToken.username
    }
  })

  if (user === null) {
    return res.status(401).json({ error: 'Invalid token' })
  }

  const todos = await models.Todo.findAll({
    where: {
      user_id: user.id
    }
  })

  return res.status(200).json({ todos })
})

// Complete todo
apiRouter.patch('/complete', async (req, res) => {
  const { todoId, completed } = req.body

  // Get user details from token
  const token = retrieveToken(req)

  if (token === null) {
    return res.status(401).json({ error: 'Invalid token' })
  }

  const userToken = decodeToken(token)

  // Get User by Username or Email
  const user = await models.User.findOne({
    where: {
      username: userToken.username
    }
  })

  if (user === null) {
    return res.status(401).json({ error: 'Invalid token' })
  }

  const todo = await models.Todo.findOne({
    where: {
      id: todoId
    }
  })

  todo.completed = completed

  await todo.save()

  const todos = await models.Todo.findAll({
    where: {
      user_id: user.id
    }
  })

  return res.status(200).json({ todos })
})

// Remove todo
apiRouter.post('/remove', async (req, res) => {
  const { todoId } = req.body

  // Get user details from token
  const token = retrieveToken(req)

  if (token === null) {
    return res.status(401).json({ error: 'Invalid token' })
  }

  const userToken = decodeToken(token)

  // Get User by Username or Email
  const user = await models.User.findOne({
    where: {
      username: userToken.username
    }
  })

  if (user === null) {
    return res.status(401).json({ error: 'Invalid token' })
  }

  await models.Todo.destroy({
    where: {
      id: todoId
    }
  })

  const todos = await models.Todo.findAll({
    where: {
      user_id: user.id
    }
  })

  return res.status(200).json({ todos })
})

// Add todo
apiRouter.post('/add', async (req, res) => {
  const { title } = req.body

  // Get user details from token
  const token = retrieveToken(req)

  if (token === null) {
    return res.status(401).json({ error: 'Invalid token' })
  }

  const userToken = decodeToken(token)

  // Get User by Username or Email
  const user = await models.User.findOne({
    where: {
      username: userToken.username
    }
  })

  if (user === null) {
    return res.status(401).json({ error: 'Invalid token' })
  }

  // Create and Insert Todo
  const todo = await models.Todo.create({
    user_id: user.id,
    title,
    completed: false
  })

  await todo.save()

  const todos = await models.Todo.findAll({
    where: {
      user_id: user.id
    }
  })

  return res.status(200).json({ todos })
})

module.exports = apiRouter