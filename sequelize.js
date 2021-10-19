const Sequelize = require('sequelize')
const UserModel = require('./models/User')
const TodoModel = require('./models/Todo')

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    ssl: true,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  })

// Initialise Models
UserModel(sequelize, Sequelize)
TodoModel(sequelize, Sequelize)

sequelize.sync({ force: false })

module.exports = sequelize