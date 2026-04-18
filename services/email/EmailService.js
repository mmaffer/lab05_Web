const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

class EmailService {

constructor() { 
    this.transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, 
      auth: {
        user: process.env.MAILER_EMAIL,
        pass: process.env.MAILER_SECRET_KEY,
      }
    });
  }

  sendEmail( options ) {

    const { to, subject, htmlBody } = options;

    try {
      this.transporter.sendMail( {
        to: to,
        subject: subject,
        html: htmlBody
      })
      .then((info) => {
        console.log(" Email enviado:", info.response); 
      }).catch((err) => {
        console.error("Error enviando el email:", err); 
      });

      return true;
    } catch ( error ) {
      return false;
    }

  }
}

module.exports = EmailService;