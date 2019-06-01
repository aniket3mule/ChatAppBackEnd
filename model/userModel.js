var bcrypt = require('bcryptjs');
var client = require('../DBConnect')
/*
declare a function usermodel
*/
function usermodel() {}
/*
create a function for password encrypt
*/
var salt = bcrypt.genSaltSync(10);

function hash(password) {
    var hashPassword = bcrypt.hashSync(password, salt);
    return hashPassword;
}

/*
creata a signup function 
*/
usermodel.prototype.register = (body, callback) => {
    /*
    check whether email is already exists or not
    */
   
    client.connect((err, db, done) => {
        if (err) {
            return console.log(err);
        } else {
            db.query(`select * from registeruser where email = '${body.email}'`, (err, data) => {
                if (err) {
                    console.log("Error in signup user schema ");
                    callback(err);
                } else if (data.length > 0) {
                    console.log("Email already exists!")
                    var response = {
                        "error": true,
                        "message": "Email already exists ",
                        "errorCode": 404
                    };
                    return callback(response);
                } else {
                    // console.log("model 43 ",body);
                    
                    var values = [`${body.fname}`, `${body.lname}`, `${body.email}`, `${body.password}`];
                    db.query('insert into registeruser(fname,lname,email,password) values($1, $2, $3, $4)', values, (err, res) => {
                        if (err) {
                            console.log("error came");
                            console.log("error in model file", err);
                            callback(err);
                        } else {
                            console.log(body.fname);
                            console.log("data save successfully", res);
                            console.log("registered successfully");
                            callback(null, res);
                            console.log("no return statements ..registered successfully");
                        }
                    });
                }
            });
        }
    });
}

module.exports = new usermodel