const { Sequelize } = require("sequelize")
const { models } = require('../sequelize.js')

module.exports = (sequelize, type) => {
  return sequelize.define('Todo', {
    title: {
      type: type.STRING,
      allowNull: false
    },
    completed: {
      type: type.BOOLEAN
    },
    user_id: {
      type: type.INTEGER,
      references: {
        model: sequelize.models.User,
        key: 'id'
      }
    }
  })
}