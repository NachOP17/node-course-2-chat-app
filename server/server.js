const path = require('path');
// Este módulo viende instalado con node, entonces no tiene que ser instalado con npm
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server); // Con esto nos comunicamos entre el servidor y el cliente

app.use(express.static(publicPath));

//io.on te deja crear un EventListener
io.on('connection', (socket) => {
  console.log('New user connected');

  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

  socket.on('createMessage', (message, callback) => {
    console.log('createMessage', message);
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback('This is from the server');  
      // io.emit emite un evento a todas las conexiones (si estás conectado en varios dispositivos)
    // socket.broadcast.emit('newMessage', {
    //   // El mensaje que se envió lo pueden ver todos desde el dispositivo (ventana) desde el cual se envió
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime()
    // });

  });

  socket.on('disconnect', () => {
    console.log('User was disconnected');
  });
});


server.listen(port, () => {
  console.log(`Started on port ${port}`);
});
