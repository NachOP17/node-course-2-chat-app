const path = require('path');
// Este módulo viende instalado con node, entonces no tiene que ser instalado con npm
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server); // Con esto nos comunicamos entre el servidor y el cliente

app.use(express.static(publicPath));

//io.on te deja crear un EventListener
io.on('connection', (socket) => {
  console.log('New user connected');

  socket.on('createMessage', (message) => {
    console.log('createMessage', message);
    io.emit('newMessage', {   // io.emit emite un evento a todas las conexiones (si estás conectado en varios dispositivos)
      from: message.from,     // mientras que socket.emit emite un evento a una sola conexión
      text: message.text,
      createdAt: new Date().getTime()
    })

  });

  socket.on('disconnect', () => {
    console.log('User was disconnected');
  });
});


server.listen(port, () => {
  console.log(`Started on port ${port}`);
});
