// youremailprogram.js
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

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

  const mailOptions = {
    from: "emailmoduledemo@gmail.com",
    to: "tharpra646@gmail.com",
    subject: "Node.js Email with Secure OAuth",
    generateTextFromHTML: true,
    html: "<b>test</b>"
};

smtpTransport.sendMail(mailOptions, (error, response) => {
    error ? console.log(error) : console.log(response);
    smtpTransport.close();
});
