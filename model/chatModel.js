var sequelize = require('../DBConfig')
const Sequelize = require('sequelize')

const Chats = sequelize.define('chats', {
    senderID: {
        type: Sequelize.STRING
    },
    receiverID: {
        type: Sequelize.STRING
    },
    message: {
        type: Sequelize.STRING
    }
})
// console.log(Chats);

module.exports = Chats