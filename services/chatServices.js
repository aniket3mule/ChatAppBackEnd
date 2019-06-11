const Chats = require('../model/chatModel');

exports.addMessage = (req, callback) => {
    Chats.sync({
        force: false
    })
        // chat_data.save((err,result) => {
        .then(function () {

            Chats.create({
                senderID: req.senderID,
                receiverID: req.receiverID,
                message: req.newMessage
            })
            var response = {
                "senderID": req.senderID,
                "receiverID": req.receiverID,
                "message": req.newMessage
            }
            console.log("result : ", response);
            // console.log("sdhfsdfg");
            return callback(null, response);
        })
        .catch(err => {
            // console.log("dfxdvdefvededed");
            response = {
                'status': false,
                'message': 'error while saving data',
                'errorcode': 404
            }
            return callback(err)
        })
}

exports.getAllChats = (req, callback) => {
    Chats.findAll({
        attributes: ['senderID', 'receiverID', 'message']
    }).then(allchats => {
        return callback(null, allchats);
    }).catch(err => {
        response = {
            'error': err,
            'message': 'Chats not found',
            'errorcode': 404
        }
        return callback(response);
    });
}