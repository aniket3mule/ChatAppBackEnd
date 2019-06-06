const service = require('../services/service');

module.exports.register = (req, res) => {

    req.checkBody('fname', 'Firstname is not valid').isLength({
        min: 3
    }).isAlpha();
    req.checkBody('lname', 'Lastname is not valid').isLength({
        min: 3
    }).isAlpha();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('password', 'password is not valid').isLength({
        min: 4
    }).equals(req.body.password);
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
        service.register(req, (err, data) => {
            if (err) {
                console.log(err);

                return res.status(500).send(err);
            } else {
                console.log('controller > data : ', data);

                return res.status(200).send(data);
            }
        });
    }
}
module.exports.login = (req, res) => {
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('password', 'password is not valid').isLength({
        min: 4
    }).equals(req.body.password);

    var validation = req.validationErrors();
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
         *send the req to the services and then callback
         */
        service.login(req, (err, data) => {
            if (err) {
                console.log('controller > if > login ', err);
                return res.status(500).send({
                    message: err
                })
            } else {
                console.log('controller > login > else : ', data);
                return res.status(200).send({
                    message: data
                });
            }
        });
    }
}

module.exports.forgetpassword = (req, res) => {
    req.checkBody('email', 'Email is not valid').isEmail();

    console.log(req.body.email);

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
        service.forgetpassword(req, (err, data) => {

            if (err) {
                console.log(err);
                return res.status(500).send({
                    message: err
                });
            } else {
                console.log(data);
                return res.status(200).send({
                    message: data
                });
            }
        });
    }
}

module.exports.resetpassword = (req, res) => {
    //console.log('Controller Reset PAss : ', req.varifiedToken.payload.email, req.confirmpassword);
    console.log('controller reset pass : ', req.body.password);
    req.checkBody('password', 'Invalid password').isLength({
        min: 3
    }).equals(req.body.password);
    if (req.varifiedToken == null) {
        //console.log('Controller Reset PAss : ', req.varifiedToken.payload.email);
        response = {
            'status': false,
            'message': 'Invalid is empty',
            'errorcode': 404
        }
        res.send(response);
    } else {
        const varifiedData = {
            'email': req.varifiedToken.payload.email,
            'password': req.body.password
        }
        service.resetpassword(varifiedData, (err, data) => {
            // console.log('Controller Reset PAss : ', req.varifiedToken.payload);
            if (err) {
                response = {
                    'status': false,
                    'message': err,
                    'errorcode': 500
                }
                return res.status(500).send(response);
            } else {
                return res.status(200).send({
                    'message': data
                });
            }
        })
    }
}

module.exports.listofuser = (req, res) => {

    service.listofuser(req, (err, data) => {
        if (err) {
            console.log('controller > if > login ', err);
            return res.status(500).send({
                message: err
            });
        } else {
            console.log('controller > if > login ', err);
            return res.status(200).send({
                message: data
            });
        }
    });
}

// module.exports.chathistory = (req, res) => {


// }