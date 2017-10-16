const path = require('path');
// Este módulo viende instalado con node, entonces no tiene que ser instalado con npm
const express = require('express');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();

app.use(express.static(publicPath));

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});
