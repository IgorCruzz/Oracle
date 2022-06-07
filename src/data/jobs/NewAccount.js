import 'dotenv/config';
import nodemailer from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';
import path from 'path';

export default {
  key: 'NewAccount',
  async handle({ password, email }) {
    try {
      const mailOptions = {
        to: email,
        subject: 'Primeiro acesso',
        template: 'newAccount',
        context: {
          password,
        },
      };

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        secureConnection: false,
        auth: {
          user: 'igor.dsn.nuvem@gmail.com',
          pass: 'rjjcmycuxvnwwkeu',
        },
        from: 'igor.dsn.nuvem@gmail.com',
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
