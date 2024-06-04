const nodemailer = require('nodemailer');

const sendEmail = async (data) => {
    return new Promise((resolve, reject) => {
        let transports = createTransport();
        let options = {
            from: "palearningservices@alerts.se.com",
            to: data.to,
            subject: data.subject,
            html: data.body,
            attachments: data.attachments ? data.attachments : null
        };

        if(data.cc) {
            options['cc'] = data.cc;
        }

        transports.sendMail(options, (err, res) => {
            if (!err) {
                resolve({ error: false });
            } else {
                resolve({
                    error: true,
                    exception: err,
                });
            }
        });
    })
}


function createTransport() {
    let transport = {
        debug: true,
        logger: true,
        host: "smtp.se.com",
        port: 587,
        secure: false,
        auth: {
            user: "palearningservices@alerts.se.com",
            pass: process.env.EMAIL_SERVICE_PASSWORD,
        },
        tls: {
            // do not fail on invalid certs
            rejectUnauthorized: false,
        }
    }
    let smtp = nodemailer.createTransport(transport);
    return smtp;
};

module.exports = { sendEmail };