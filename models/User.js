const { Sequelize } = require("sequelize")

module.exports = (sequelize, type) => {
  return sequelize.define('User', {
    username: {
      type: type.STRING,
      allowNull: false
    },
    password: {
      type: type.STRING,
      allowNull: false
    },
    firstName: {
      type: type.STRING,
      allowNull: false
    },
    lastName: {
      type: type.STRING,
      allowNull: false
    },
    email: {
      type: type.STRING,
      allowNull: false
    },
    photo: {
      type: Sequelize.STRING
    }
  })
}