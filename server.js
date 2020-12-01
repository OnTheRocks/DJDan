require('dotenv').config()
const express = require('express');
const nodemailer = require('nodemailer');

 
const server = express();
server.use(express.static(__dirname + '/public'));

const host = process.env.HOST;
const user = process.env.USER;
const pw = process.env.PW;


// async..await is not allowed in global scope, must use a wrapper
async function main() {
    
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: host,
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: user, 
        pass: pass, 
      },
      tls:{
        rejectUnauthorized:false
      }
    });
  
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"🎧 DJ DAN WebSite 🎧" <nathan_huber@comcast.net>', // sender address
      to: "nathan_huber@yahoo.com, nathan_huber@comcast.net, ChicagoN8@Gmail.com", // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>", // html body
    });
  
    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  }
  
  main().catch(console.error);

 
const port = process.env.PORT || 10001;
server.listen(port, function() {
    console.log('server listening on port ' + port);
});