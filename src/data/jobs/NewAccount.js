import 'dotenv/config';
import nodemailer from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';
import path from 'path';

export default {
  key: 'NewAccount',
  async handle({ password, email }) {
    try {
      const mailOptions = {
        from: 'InfraCidades <gerobras.dev@gmail.com>',
        to: email,
        subject: 'Primeiro acesso',
        template: 'newAccount',
        context: {
          password,
        },
      };

      const transporter = nodemailer.createTransport({
        host: 'smtp-relay.sendinblue.com',
        port: 587,
        auth: {
          user: 'igorcruz.dev@gmail.com',
          pass: 'pm8d5sKF29HzqRW7',
        },
        from: 'igorcruz.dev@gmail.com',
      });

      transporter.use(
        'compile',
        hbs({
          viewEngine: {
            extName: '.handlebars',
            partialsDir: path.resolve(__dirname, '..', 'templates'),
            defaultLayout: false,
          },
          viewPath: path.resolve(__dirname, '..', 'templates'),
          extName: '.handlebars',
        })
      );

      const response = await transporter.sendMail(mailOptions);
      console.log('=======================');
      console.log('aceito:', response.accepted);
      console.log('rejeitado:', response.rejected);
      console.log('resposta:', response.response);
      console.log('message id:', response.messageId);
    } catch (error) {
      console.log('error', error);
    }
  },
};
