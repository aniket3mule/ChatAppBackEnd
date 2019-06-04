
var sequelize = require('../DBConfig')
const Sequelize = require('sequelize')
const jwt = require('jsonwebtoken')
const mail = require('../middleware/sendmail')

/*
declare a function usermodel
*/

/*
create a function for password encrypt
*/




    /*
    check whether email is already exists or not
    */
    const Users = sequelize.define('users', {
        //attributes
        fname: {
            type : Sequelize.STRING,
           // allowNull: false
        },
        lname: {
            type : Sequelize.STRING,
            //allowNull: false
        },
        email: {
            type : Sequelize.STRING,
            //allowNull: false
        },
        password: {
            type : Sequelize.STRING,
            //allowNull: false
        }
    })
    module.exports=Users


/*
creata a register function 
*/