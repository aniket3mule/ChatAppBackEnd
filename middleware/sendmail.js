const nodemailer = require('nodemailer');

exports.sendEmailFunction = (url) => {
    console.log('\nurl',url);
    
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
        to: 'aniketmule1@outlook.com',
        subject: 'Chat-app password for authorization link ',
        text: 'Please go through the e-mail verifaction link provided in this mail:\n\n' + url
    };
    /*
    send mail from given mail id, by using authriozation info
    */
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log("is it is invalid");
            console.log("error on sending mail--", err)
        }
        else
            console.log('result of sending mail-- ', info);
    });

}
