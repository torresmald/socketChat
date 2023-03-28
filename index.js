const express = require('express');
const cors = require('cors');
const app = express();
const htpp = require('http').Server(app);
const io = require('socket.io')(htpp, {
    allowRequest: (req, callback) => {
        const noOriginHeader = req.headers.origin === undefined;
        callback(null, noOriginHeader); // only allow requests without 'origin' header
      }
})
app.use(cors());
io.on('connection', (socket) => {
    console.log('Nuevo usuario Conectado');
    socket.on('sendMessage', (messageInfo) => {
        socket.broadcast.emit('receiveMessage', messageInfo);
    })
})


app.get('/', (request, response) => {
    response.status(200).json('Bienvenido a la API.')
})
htpp.listen(4000, () => {
    console.log(`Listening in http://localhost:4000`);
});

module.exports = app;