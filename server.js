require('dotenv').config()

const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
const path = require('path');
const { send } = require('process');

const host = process.env.HOST;
const user = process.env.USER;
const pw = process.env.PW;
const PORT = process.env.PORT || 10001;

//------------- Data Parsing ------------------------//
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.post('/email', (req, res) => {
    const { email, fullName, message } = req.body;
    console.log('Data: ', req.body);

    const output = `
  <p> You have a new contact request</p>
  <h3>Contact Details</h3>
  <ul>
    <li>Name: ${req.body.fullName}</li> 
    <li>Email: ${req.body.email} </li>
  </ul>
    <h3>Message:</h3>
    <p> ${req.body.message} </p>
    `;

//   console.log(req.body);  


  sendMail(email, fullName, message, function(err, data) {
      if(err) {
          console.log("Error: ", err);
          return res.status(500).json({ message: err.message || "Internal Error" });
      }
      console.log("Email Sent!");
      return res.json({ message: "Email Sent!" });
  });
});

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



const sendMail = (email, fullName,  message, cb) => {
    const mailOptions = {
        from: "🎧 DJ Dan Website 🎧" + email,  // sender address
        to: "nathan_huber@yahoo.com, nathan_huber@comcast.net, ChicagoN8@Gmail.com", // list of receivers
        subject: fullName, // Subject line
        text: message, // plain text body
        html: `
        <p> You have a new contact request</p>
        <h3>Contact Details</h3>
        <ul>
          <li>Name: ${fullName} </li> 
          <li>Email: ${email} </li>
        </ul>
          <h3>Message:</h3>
          <p> ${message} </p>
          ` // html body
    };
    transporter.sendMail(mailOptions, function(err, data) {
        if (err) {
            return cb(err, null);
        }
        return cb(null, data);
    });
}

app.listen(PORT, () => console.log(`Server has started on port  ${PORT}!`));






// var express = require('express');
 
// var server = express();
// server.use(express.static(__dirname + '/public'));
 
// var port = process.env.PORT || 10001;
// server.listen(port, function() {
//     console.log('server listening on port ' + port);
// });