require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const route = require('./route/Routes');
const app = express();
const expressValidator = require('express-validator');
const server = require('http').createServer(app)
const io = require('socket.io').listen(server)
const cors = require('cors');
const PORT = 4000;
const chatController = require('./controller/chatController');

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(express.static('../client'));
app.use('/', route);

server.listen(PORT, () => {
    console.log('Litsning on port : ' + PORT);
})
/**
 * Connect Server and client by using socket IO
 */
var connections = [];
//.on event fired when we get the new connection
io.sockets.on('connection', (socket) => {
    connections.push(socket);
    console.log("\nEvent is connected and listing ", connections.length);
    /**
     * event is connected and listen, and socket.on wait for callback to called the function
     */
    socket.on('newMessage', (message) => {
        chatController.addMessage(message, (err, data) => {
            if (err) {
                console.log('Services socket IO :', err);
            } else {
                console.log('Services data : ', data);
                socketio.sockets.emit('sendMessage', data)
            }
        })
    })
    socket.on("disconnect", function () {
        connections.splice(connections.indexOf(socket), 1)
        console.log("User Disconnected: ")
    }) 
})
