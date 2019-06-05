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
                'error': true,
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
                        'error': true,
                        'message': "Data save successfully",
                    }
                    return callback(response);
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

                        callback(null, res);
                    } else {
                        console.log("Incorrect password");
                        callback("Incorrect password");
                    }
                })
            }
        })
        .catch((err) => {
            return callback("Please check Email")
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
        const url = `http://localhost:3000/login?token=${tobj.token}`
        mail.sendEmailFunction(url);

    }).catch(err => {
        console.log('Email is not present');
        response = {
            'error': true,
            'message': 'Email not exist',
            'errorcode': 404
        }
        callback(response);
    })

}
/*
 * List of users 
 */
exports.listofuser = (req, callback) => {
    Users.findAll({
        attributes: ['fname', 'lname']
    }).then(userslist => {
        callback(userslist);
    }).catch(err => {
        response = {
            'error': err,
            'message': 'Lists not found',
            'errorcode': 404
        }
        callback(response);
    });
}