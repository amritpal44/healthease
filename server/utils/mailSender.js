const nodemailer = require("nodemailer");
require("dotenv").config();

const mailSender = async(email, title, body) => {

    try {
        //console.log("in mail sender");
        let transporter = nodemailer.createTransport(
            {
                host: process.env.MAIL_HOST,
                auth: {
                    user: process.env.MAIL_USER,
                    pass: process.env.MAIL_PASS
                },
                secure: false
            }
        )

        let info = await transporter.sendMail(
            {
                from: `"HealthEase" <${process.env.MAIL_USER}>`, // sender address
                to: `${email}`, // list of receivers
                subject: `${title}`, // Subject line
                html: `${body}`, // html body
            }
        )

        console.log(info.response)
        return info

    } catch (error) {
        console.log("Error while sending mail: ", error);
        return error.message;
    }
}

module.exports = mailSender;