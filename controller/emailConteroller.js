const path = require('path'); //To get the Path
const emailvalidator = require('email-validator')
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
const config = require("../config/config")

var transporter = nodemailer.createTransport(smtpTransport({
    service: config.servic,
    host: config.host,
    auth: {
        user: config.user,
        pass: config.pass
    }
}));

function email_validator(req, res,next) {
    // EmailId = req.body.EmailId

    // var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (emailvalidator.validate(req.body.EmailId)) {
        if (Object.keys(req.body.Subject).length !== 0) {
            if (Object.keys(req.body.Message).length !== 0) {
                var mailOptions = {
                    from: config.user,
                    to: req.body.EmailId,
                    subject: req.body.Subject,
                    text: req.body.Message

                };
                transporter.sendMail(mailOptions)
                res.sendFile('success.html', { root: path.join(__dirname, '../views') });
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
