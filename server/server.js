require('./config/config');

const express = require('express');
const app = express();
const cors = require('cors');
const server = require('http').createServer(app);
const socketIO = require('socket.io')(server,{
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
})

app.use(cors());

// Configuración global de rutas
app.use(require('./routes/index'));


module.exports.io = socketIO


require('./sockets/socket');


server.listen(process.env.PORT, () => {
  console.log('escuchando puerto: ', process.env.PORT);
});


