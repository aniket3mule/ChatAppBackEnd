const express = require('express');
const route = express.Router();
const controller=require('../controller/controller')
// route.post('/login',controller.login)
route.post('/register',controller.register)
route.post('/forgetpassword',controller.forgetpassword)
// route.post('/emailvarification',controller.emailvarification)
// route.post('/listofuser',controller.listofuser)
// route.post('/chat history',controller.chathistory)

module.exports = route