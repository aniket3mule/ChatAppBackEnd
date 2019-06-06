const jwt = require('jsonwebtoken');
exports.verifyToken = (req, res, next) => {
    const token = req.headers['token'];
    // console.log('token verification : ',token);
    if (token) {
        jwt.verify(token, "SECRET_KEY", (err, varifiedToken) => {
            if (err) {
                return res.send(responce = {
                    'status': false,
                    'message': 'Token is not valid'
                })
            } else {
                req.varifiedToken = varifiedToken;
                next();
            }
        })
    } else {
        res.send(responce = {
            'status': false,
            'message ': 'token not provided'
        })
    }
}