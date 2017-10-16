var socket = io();
/*
El io es un método que hace que se inicie un pedido del cliente al
servidor para abrir un web socket y dejar esa conexión abierta
*/

socket.on('connect', function() {
  console.log('Connected to server');
});

socket.on('disconnect', function()  {
  console.log('Disconnected from server');
});

socket.on('newMessage', function(message) {
  console.log('New Message', message);
});
