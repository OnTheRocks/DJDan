const express = require('express');
const nodemailer = require('nodemailer');

 
const server = express();
server.use(express.static(__dirname + '/public'));
 
const port = process.env.PORT || 10001;
server.listen(port, function() {
    console.log('server listening on port ' + port);
});