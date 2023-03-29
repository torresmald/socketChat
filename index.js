const express = require('express');
const cors = require('cors');
const bodyParse = require('body-parser');
const app = express();
const htpp = require('http').Server(app);
const PORT = process.env.PORT || 4000;
const io = require('socket.io')(htpp, {
    cors: {
        origins: ["http://localhost:4200"],
        credentials: true,
        allowedHeaders: ["my-custom-header"],


    }
})

app.use(cors());

app.use(bodyParse.urlencoded({extended: true}))
app.use(bodyParse.json());

io.on('connection', (socket) => {
    console.log('Nuevo usuario Conectado');
    socket.on('sendMessage', (messageInfo) => {
        socket.broadcast.emit('receiveMessage', messageInfo);
    })
})


app.get('/', (request, response) => {
    response.status(200).json('Bienvenido a la API.')
})
htpp.listen(PORT, () => {
    console.log(`Escuchando en http://localhost:${PORT}`);
});

module.exports = app;