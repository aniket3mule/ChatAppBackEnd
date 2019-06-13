const express = require('express');
const route = express.Router();
const controller=require('../controller/userController')
const chatController=require('../controller/chatController')
const tokenVerification = require('../middleware/tokenVerification')
// const chatController=require('../controller/chatController')


route.post('/login',controller.login)
route.post('/register',controller.register)
route.post('/forgetpassword',controller.forgetpassword)
route.post('/resetpassword/:token',tokenVerification.verifyToken,controller.resetpassword)
route.post('/addMessage', chatController.addMessage)
// route.post('/emailvarification',controller.emailvarification)
route.get('/listofuser',controller.listofuser)
route.get('/getallchats',chatController.getAllChats)

module.exports = route