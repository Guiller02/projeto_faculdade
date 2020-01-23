const sgMail = require("@sendgrid/mail");

//enquanto estiver em desenvolvimento, deixe essas funções comentadas
exports.register = async (name, email, register, mailToken) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const link = "localhost/auth/authenticateUser/" + mailToken;

  // // console.log('passou aqui')

  // const msg = {
  //   //extract the email details
  //   to: email,
  //   from: 'notReply@gmail.com',
  //   subject: 'Bem vindo a nossa faculdade',
  //   templateId: process.env.templateId,
  //   "dynamic_template_data": {
  //     "name": name,
  //     "registration": register,
  //     "link": link
  //   }
  // };

  // // //send the email
  // (async () => {
  //   try {
  //     await sgMail.send(msg);
  //   } catch (err) {
  //     console.error(err.toString());
  //   }
  // })();
};
