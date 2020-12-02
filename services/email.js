const nodemailer = require('nodemailer');

const sendMail = async (mailOptions) => {

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service:'gmail',
        auth: {
            user: process.env.gmailId, // generated ethereal user
            pass: process.env.gmailPwd, // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({...mailOptions});
    // from: '"Fred Foo" <foo@example.com>', // sender address
    // to: "bar@example.com, baz@example.com", // list of receivers
    // subject: "Hello ✔", // Subject line
    // text: "Hello world?", // plain text body
    // html: "<b>Hello world?</b>", // html body

    console.log("Email sent:", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}
