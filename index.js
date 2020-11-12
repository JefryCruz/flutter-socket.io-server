const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();

//Node Server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket');

//path publico, aca se pondra la dirección del dominio o donde se desplezque el socket
const publicPath = path.resolve(__dirname, 'public');

app.use(express.static(publicPath));

server.listen(process.env.PORT, (error) => {
    if(error) throw new Error(error);

    console.log('Servidor corriendo en el puerto', process.env.PORT);
});