const sgMail = require('@sendgrid/mail');

exports.register = function register(name, email, register, mailToken) {
    // sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    // const link = 'localhost/auth/authenticateUser/' + mailToken

    // console.log('passou aqui')

    // const msg = {
    //     //extract the email details
    //     to: email,
    //     from: 'notReply@gmail.com',
    //     subject: 'Bem vindo a nossa faculdade',
    //     templateId: process.env.templateId,
    //     "dynamic_template_data": {
    //         "name": name,
    //         "registration": register,
    //         "link": link
    //     }
    // };

    // //send the email
    // sgMail.send(msg);
}
