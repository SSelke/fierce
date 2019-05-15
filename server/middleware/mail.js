const nodemailer = require('nodemailer');
const mailGun = require('nodemailer-mailgun-transport');
const config = require('../config/keys');

/* 
    If you would like to use this feature, then you need to set up an account
    with MAILGUN, a SMTP service. This is basic configuration, additional setup
    required for email templates / error handling
*/

const auth = {
    auth: {
        api_key: config.MAILGUN_API_KEY,
        domain: config.MAILGUN_DOMAIN
    }
};

const transporter = nodemailer.createTransport(mailGun(auth));


const sendMail = async (message, subject, to) => {
    // This is the email configuration
    const mailOptions = {
        from: config.FROM_EMAIL,
        to: to,
        subject: subject,
        text: message
    }

    transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
            { /* HANDLE ERRORS */ }
        } else {
            console.log("message Sent");
            { /*DO SOMETHING GOOD*/ }
        }
    });
}

module.exports = sendMail;