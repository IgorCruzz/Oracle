import 'dotenv/config';
import nodemailer from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';
import path from 'path';
import transporterConfig from '../../config/transporter';

export default {
  key: 'RecoverPassword',
  async handle({ token, email }) {
    try {
      const mailOptions = {
        from: `InfraCidades <${process.env.MAIL_TRANSPORTER_FROM}>`,
        to: email,
        subject: 'Redefinição de senha',
        template: 'password',
        context: {
          token,
          email,
          host: `${process.env.CLIENT_HOST}/redefinirSenha?codigo=${token}&email=${email}`,
        },
      };

      const transporter = nodemailer.createTransport({
        ...transporterConfig,
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
