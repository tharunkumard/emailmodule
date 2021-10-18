const express = require('express');
const cors = require('cors');
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const app = express();
const port = process.env.API_PORT || 3000;
app.use(cors());
const server = app.listen(port, () => console.log(`API Server listening on port ${port}`));
process.on('SIGINT', () => server.close());

const oauth2Client = new OAuth2(
    "730505427363-ii2d419v6baq5vq99ifcce8pck9g210a.apps.googleusercontent.com", // ClientID
    "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", // Client Secret
    "https://developers.google.com/oauthplayground" // Redirect URL
);

oauth2Client.setCredentials({
    refresh_token: "1//04oEjsB2x6YcuCgYIARAAGAQSNwF-L9IrAq3YTZWCoiSA1bjAK2Z4Q9huEX-hO4ty5_wgcO-z-r03Mh15VhaXCPwLu9r0HvIv2XE"
});
const accessToken = oauth2Client.getAccessToken()

const smtpTransport = nodemailer.createTransport({
    service: "gmail",
    auth: {
         type: "OAuth2",
         user: "emailmoduledemo@gmail.com", 
         clientId: "730505427363-ii2d419v6baq5vq99ifcce8pck9g210a.apps.googleusercontent.com",
         clientSecret: "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",
         refreshToken: "1//04oEjsB2x6YcuCgYIARAAGAQSNwF-L9IrAq3YTZWCoiSA1bjAK2Z4Q9huEX-hO4ty5_wgcO-z-r03Mh15VhaXCPwLu9r0HvIv2XE",
         accessToken: accessToken
    }
});

tls: {
    rejectUnauthorized: false
  }
 
 

app.get('/email', (req, res) => {
  var from = "emailmoduledemo@gmail.com";
  var to = req.query.to;
  var subject = req.query.subject;
  var generateTextFromHTML = true;
  var html = req.query.html;
  const mailOptions = {
    from:from,
    to:to,
    subject:subject,
    generateTextFromHTML:generateTextFromHTML ,
    html:html
};
  smtpTransport.sendMail(mailOptions, (error, response) => {
    error ? console.log(error) : console.log(response);
    smtpTransport.close();
});
  res.send({
    msg: 'Your email was sent'
  });
});

