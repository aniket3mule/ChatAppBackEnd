var Users = require('../model/userModel')
// const sequelize = require('sequelize')
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);

function hash(password) {
    var hashPassword = bcrypt.hashSync(password, salt);
    return hashPassword;
}


/*
creata a register function 
*/
exports.register = (req, callback) => {
    /*
    send data to model and callback from there and here both
    */
Users.sync({force: false}).then(function () {
    return Users.create({
        fname: req.body.fname, 
        lname: req.body.lname,
        email : req.body.email,
        password: hash(req.body.password),
       });
})

.catch((err) => {
  console.log(err);
});

}

/*
for forgetpassword 
*/
exports.login = (req, callback) => {
    /*
    send data to model and callback from there and here both
    */


}