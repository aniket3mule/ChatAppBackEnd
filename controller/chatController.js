const chatServices = require('../services/chatServices');

module.exports.addMessage = (req, callback) => {
    chatServices.addMessage(req, (err, data) => {
        if (err) {
            return callback(err);
        } else {
            console.log("Callback====>");

            return callback(null, data);
        }
    })
}

module.exports.getAllChats = (req, res) => {
    console.log('get ALL Chat controller .....>>>>>');

    chatServices.getAllChats(req, (err, data) => {
        if (err) {
            return res.status(500).send(err);
        } else {
            res.status(200).send(data)
        }
    })
}