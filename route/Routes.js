const express = require('express');
const route = express.Router();
const controller=require('../controller/controller')
const chatController=require('../controller/chatController')
const tokenVerification = require('../middleware/tokenVerification')

route.post('/login',controller.login)
route.post('/register',controller.register)
route.post('/forgetpassword',controller.forgetpassword)
route.post('/resetpassword/:token',tokenVerification.verifyToken,controller.resetpassword)
route.post('/addMessage', chatController.addMessage)
// route.post('/emailvarification',controller.emailvarification)
route.get('/listofuser',controller.listofuser)
// route.post('/chat history',controller.chathistory)

module.exports = route