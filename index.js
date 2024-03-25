'use strict';
const app = require('./app');
const port = process.env.PORT || 3000;
const http = require('http');

const server = http.createServer(app);

server.listen(port, () => {
  console.log('|--------------------------------------------');
  console.log('| Port         : ' + port);
  console.log('|--------------------------------------------');
  console.log('| Waiting For Database Connection ');
});
