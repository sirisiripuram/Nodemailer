const path = require('path'); //To get the Path
const emailvalidator = require('email-validator')
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

const config = require("../config/config")
const { Util } = require("./../common/util");
const util = new Util();

var transporter = nodemailer.createTransport(smtpTransport({
    service: config.service,
    host: config.host,
    auth: {
        user: config.user,
        pass: config.pass
    }
}));

function email_validator(req, res) {
    if (emailvalidator.validate(req.body.EmailId)) {
        if (Object.keys(req.body.Subject).length !== 0) {
            if (Object.keys(req.body.Message).length !== 0) {
                let data={
                    name:req.body.Subject,
                    verificationUrl:req.body.Message
                }
            
                var mailOptions = {
                    from: config.user,
                    to: req.body.EmailId,
                    subject: req.body.Subject,
                    html: util.template({data})
                };
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.log('Error occurred:', error.message);
                        res.status(500).send('Failed to send email');
                    } else {
                        console.log('Message sent successfully!');
                        res.send('Email sent successfully');
                    }
                });
            }
            else {
                res.sendFile('Messagefailed.html', { root: path.join(__dirname, '../views') });
            }

        }
        else {
            res.sendFile('Subjectfailed.html', { root: path.join(__dirname, '../views') });
        }
    }
    else {
        res.sendFile('Emailfailed.html', { root: path.join(__dirname, '../views') });
    }
};
function gettingHomePage(req, res) {
    res.sendFile('email.html', { root: path.join(__dirname, '../views') });
};
module.exports = { gettingHomePage, email_validator };
