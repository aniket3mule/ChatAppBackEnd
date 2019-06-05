var sequelize = require('../DBConfig')
const Sequelize = require('sequelize')

const Users = sequelize.define('users', {
    //attributes
    fname: {
        type: Sequelize.STRING,
        // allowNull: false
    },
    lname: {
        type: Sequelize.STRING,
        //allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        //allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        //allowNull: false
    }
})
module.exports = Users
