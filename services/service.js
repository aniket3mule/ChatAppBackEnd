const Users = require('../model/userModel')
const mail = require('../middleware/sendmail')
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const generateToken = require('../middleware/generateToken');

/*
 *screate a function for password encrypt
 */
function hash(password) {
    var hashPassword = bcrypt.hashSync(password, salt);
    return hashPassword;
}
/*
 *Register user
 */
exports.register = (req, callback) => {
    /*
     *check whether email is already exists or not
     */
    Users.findOne({
        where: {
            email: req.body.email
        },
        attributes: ['email']
    }).then(email => {
        // email will be the first entry of the Projects table with the email 'email' || null
        if (email !== null) {
            console.log('if', email, 'Email already present');
            response = {
                'status': false,
                'message': 'Email already exist',
                'errorcode': 404
            }
            return callback(response)
        } else {
            Users.sync({
                    force: false
                }).then(function () {
                    Users.create({
                        fname: req.body.fname,
                        lname: req.body.lname,
                        email: req.body.email,
                        password: hash(req.body.password),
                    });
                    response = {
                        'status': true,
                        'message': "Data save successfully",
                    }
                    console.log('service > response :',response);
                    
                    return callback(null, response);
                })
                .catch((err) => {
                    return callback(err)
                });
        }
    })
}
/*
 * login user 
 */
exports.login = (req, callback) => {
    /*
     *check whether email is already exists or not
     */
    Users.findOne({
            where: {
                email: req.body.email,
            },
            attributes: ['email', 'password']
        })
        .then(user => {
            // email will be the first entry of the Projects table with the email 'email' || null
            if (user.email == req.body.email) {
                //compare two encripted passwords and returns the boolean value true or false
                bcrypt.compare(req.body.password, user.password).then(function (res) {
                    if (res) {
                        const payload = {
                            'email': req.body.email
                        }
                        const token = generateToken.tokenGenrate(payload);

                        console.log("login succesfully");
                        response = {
                            'status' : true,
                            'message' : 'Login Successfully' 
                        }
                        return callback(null, response)
                    } else {
                        response = {
                            status : false,
                            message : "incorrect Password",
                            errorcode : 404
                        }
                        callback(response);
                    }
                })
            }
        })
        .catch((err) => {
            return callback(err)
        });
}
/*
 * forget password 
 */
exports.forgetpassword = (req, callback) => {
    Users.findOne({
        where: {
            email: req.body.email
        },
        attributes: ['email']
    }).then(email => {
        const payload = {
            'email': email.email
        }
        const tobj = generateToken.tokenGenrate(payload);
        const url = `http://localhost:3000/resetpassword/${tobj.token}`
        mail.sendEmailFunction(url);
        response = {
            'status' :true,
            'message' : 'Reset Password link sent to your registerd email'
        }
        return callback(null,response);

    }).catch(err => {
        console.log('Email is not present');
        response = {
            'error': true,
            'message': 'Email not exist',err,
            'errorcode': 404
        }
        callback(response);
    })
}
/*
 * Reset Password 
 */
 exports.resetpassword = (req, callback)=>{
     //console.log('services resetpass : ',req.email, req.password);
     Users.update({password : req.password,},
         {where: {
             email :req.email
         }}
         ).then(rowUpdated=>{
         console.log(rowUpdated);
         response ={
             'status' : true,
             'message' : rowUpdated,
         }
         console.log('password updated successfully');
         return callback(null, response);
     }).catch(err =>{
        console.log('error in query');
         return callback(err)
         
     })
 }
/*
 * List of users 
 */
exports.listofuser = (req, callback) => {
    Users.findAll({
        attributes: ['fname', 'lname']
    }).then(userslist => {
        return callback(null, userslist);
    }).catch(err => {
        response = {
            'error': err,
            'message': 'Lists not found',
            'errorcode': 404
        }
        return callback(response);
    });
}