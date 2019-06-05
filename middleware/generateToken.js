const jwt = require('jsonwebtoken');

module.exports = {
    tokenGenrate(payload) {
        try {
            var token = jwt.sign({
                payload
            }, "SECRET_KEY", {
                expiresIn: 50000
            })
            var obj = {
                message: 'token Generated',
                token: token
            }
            console.log("der", obj);
            return obj;
        } catch (e) {
            console.log(e)
        }
    }

}