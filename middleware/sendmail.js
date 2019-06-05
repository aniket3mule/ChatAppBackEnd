const nodemailer = require('nodemailer');
const events = require('events');

exports.sendEmailFunction = (url) => {
    this.events = new events.EventEmitter();
    
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        /*
        email and password are hidden by using of env file
        */
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        },
    });

    const mailOptions = {
        from: 'aniketmule218@gmail.com',
        to: 'angledark436@gmail.com',
        subject: 'Chat-app password for authorization link ',
        text: 'Please go through the e-mail verifaction link provided in this mail:\n\n' + url
    };
    /*
    send mail from given mail id, by using authriozation info
    */
    transporter.sendMail(mailOptions, (err, success) => {
        if (err) {
           // this.events.emit('Error while Sending Mail : ',err)
        } else{
            this.events.emit('Mail send successfully : ',success)
        }
    });
}