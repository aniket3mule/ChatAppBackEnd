var usermodel = require('../model/userModel')

/*
for signup 
*/
exports.register = (req, callback) => {
    /*
    send data to model and callback from there and here both
    */
    usermodel.register(req, (err, data) => {
        // console.log('11',req);
        
        if (err) {
            return callback(err);
        } else {
            return callback(null, data);
        }
    })
}