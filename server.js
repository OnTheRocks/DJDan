require('dotenv').config()

const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
const path = require('path');

const host = process.env.HOST;
const user = process.env.USER;
const pw = process.env.PW;
const PORT = process.env.PORT || 10001;

//------------- Data Parsing ------------------------//
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

let transporter = nodemailer.createTransport({
    host: host,
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: user, 
        pass: pw 
      },
      tls:{
        rejectUnauthorized:false
      }
    });


let mailOptions = {
    from: '"Nodemailer Contact 👻" <nathan_huber@comcast.net>', // sender address
    to: "nathan_huber@yahoo.com, nathan_huber@comcast.net, ChicagoN8@Gmail.com", // list of receivers
    subject: "Node Contact Request", // Subject line
    text: "Hello world?", // plain text body
    // html: output, // html body
  };


transporter.sendMail(mailOptions, function(err, data) {
    if (err) {
        console.log('Error Occured', err);
    } else {
        console.log('Email Sent!');
    }
});

app.listen(PORT, () => console.log(`Server has started on port  ${PORT}!`));






// var express = require('express');
 
// var server = express();
// server.use(express.static(__dirname + '/public'));
 
// var port = process.env.PORT || 10001;
// server.listen(port, function() {
//     console.log('server listening on port ' + port);
// });