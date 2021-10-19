require('dotenv').config()

const express = require('express')
const cors = require('cors')
const sequelize = require('./sequelize')
const path = require('path')

const userRouter = require('./controllers/user')
const todoRouter = require('./controllers/todo')

// Authenticate with DB
console.log('DB Connection: ', process.env.DATABASE_URL)
sequelize.authenticate()
  .then(() => console.log('Connection has been established succesfully.'))
  .catch((err) => console.error('Unable to connect to the database:', err))

// Initialise Express App
const app = express()

// Middleware
var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // intercept OPTIONS method
  if ('OPTIONS' == req.method) {
    res.send(200);
  }
  else {
    next();
  }
};
app.use(allowCrossDomain);
/*
app.use(cors({
  origin: '*',
  credentials: true
}))
*/
app.use(express.json())
app.use(express.static('build'))

// Cors options
//app.options('*', cors())



// Controllers
app.use('/api/user', userRouter)
app.use('/api/todo', todoRouter)

// Error Handler
app.use((err, req, res, next) => {
  if (err.code === 'INCORRECT_FILETYPE') {
    return res.status(422).json({ error: 'Only images are allowed' })
  }

  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(422).json({ error: 'Allowed file size is 500KB' })
  }
})

// Handle Production
if (process.env.NODE_ENV === 'production') {
  console.log('Running in production mode')
  // Static Folder
  app.use(express.static(path.join(__dirname, 'client', 'dist')))

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'))
  })
}

// Run Server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})