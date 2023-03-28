const nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var handlebars = require('handlebars');
var fs = require('fs');

var readHTMLFile = function(path, callback){
    fs.readFile(path, {encoding: 'utf-8'}, (err, html) => {
        if(err){
            callback(err);
        } else {
            callback(null, html);
        };
    });
};

// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         type: 'OAuth2',
//         user: process.env.MAIL_ADD,
//         clientId: process.env.MAIL_CLIENTID,
//         clientSecret: process.env.MAIL_CLIENTSECRET,
//         refreshToken: process.env.MAIL_REFRESHTOKEN
//     }
// });
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAIL_ADD,
        pass: process.env.MAIL_PASS
    }
});

const mailOptions = {
    from: process.env.MAIL_ADD,
    subject: 'MANUBUSTER: Reset password',
}

function sendRecoverPwdMail(url, name, email){

    readHTMLFile(__dirname + '/resetTemplate.html', function(err, html) {
        if (err) {
           console.log('error reading file', err);
           return false;
        }
        var template = handlebars.compile(html);
        var replacements = {
             name: name,
             action_url: url
        };
        var htmlToSend = template(replacements);

        mailOptions.to = email;
        mailOptions.html = htmlToSend;

        transporter.sendMail(mailOptions, function (error, response) {
            if (error) {
                console.log(error);
            } else {
                console.log(`email sent to ${email} - ${info.response}`);
            }
        });
    });
    console.log(`sending mail to ${name} and email ${email} with url: ${url}`);
}


module.exports = {
    sendRecoverPwdMail
}