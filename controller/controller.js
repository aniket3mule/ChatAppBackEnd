// const express = require('express');
 const service=require('../services/service');
// const app = express();
// let util = require('util')
const { check, validationResult } = require('express-validator');
var jwt = require('jsonwebtoken')
var mail = require('../middleware/sendmail')

module.exports.register = (req,res) => {

    req.checkBody('fname', 'Firstname is not valid').isLength({ min: 3 }).isAlpha();
    req.checkBody('lname', 'Lastname is not valid').isLength({ min: 3 }).isAlpha();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('password', 'password is not valid').isLength({ min: 4 }).equals(req.body.password);
    var validation = req.validationErrors()
    var response = {};
    /*
    check validations if error came then send error response
    */
    if (validation) {
        response.success = false;
        response.error = validation;
        return res.status(422).send(response);
    } 
    else {
        /*
         send the req to the services and then callback
        */
       service.register(req.body, (err, data) => {
            if (err) {
                console.log(err);
                return res.status(500).send({
                    message: err
                });
            } 
            else {
                var token = jwt.sign({ email: data.email }, "secretKey", { expiresIn: 86400000 })
                console.log("token", token);

                mail.sendEmailFunction(token)
                console.log("\ndata",data);
                return res.status(200).send({
                    message: data
                });
            }

        });

    }
}
// module.exports.login = (req, res) => {


// }

module.exports.forgetpassword = (req,res) => {
    req.checkBody('email', 'Email is not valid').isEmail();

    var validation = req.validationErrors()
    var response = {};
    /*
    check validations if error came then send error response
    */
    if (validation) {
        response.success = false;
        response.error = validation;
        return res.status(422).send(response);
    } else {
        /*
         send the req to the services and then callback
        */
       service.forgetpassword(req.body , (err, data)=>{
            if(err){
                console.log(err);
                return res.status(500).send({
                    message: err
                });
            }
            else {
                console.log(data);
                return res.status(200).send({
                    message: data
                });
            }
       });
    }
}

// module.exports.emailvarification = (req, res) => {

// }

// module.exports.listofuser = (req,res) => {

// }

// module.exports.chathistory = (req, res) => {


// }