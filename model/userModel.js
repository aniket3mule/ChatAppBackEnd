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
creata a register function 
*/
usermodel.prototype.register = (body, callback) => {
    /*
    check whether email is already exists or not
    */
    console.log(body);

    client.connect((err, db, done) => {
        if (err) {
            return console.log(err);
        } else {
            var values = `'${body.email}'`;
            console.log('model 31', values);

            db.query(`select email from registeruser where email = ${values}`, (err, data) => {
                console.log(' Model 34 : ', data);

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
                    var values = [`${body.fname}`, `${body.lname}`, `${body.email}`, `${hash(body.password)}`, `${parseInt(body.mobile)}`];
                    db.query('insert into registeruser(fname, lname, email, password, mobile) values($1, $2, $3, $4, $5)', values, (err, res) => {
                        if (err) {
                            console.log("error came");
                            //console.log("error in model file", err);
                            callback(err);
                        } else {
                            //console.log(body.fname);
                           // console.log("data save successfully", res);
                            console.log("registered successfully");
                            //console.log("module59", res);
                            callback(null, res);


                        }
                    });
                }
            });
        }
    });
}


/*
creata a register function 
*/
usermodel.prototype.forgetpassword = (body, callback) => {
    console.log(`${body.email}`);

}



module.exports = new usermodel