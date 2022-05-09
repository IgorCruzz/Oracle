import { createTransport } from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';
import { create } from 'express-handlebars';
import { resolve } from 'path';

class Mail {
  constructor() {
    this.transporter = createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      auth: {
        user: 'igor.dsn.nuvem@gmail.com',
        pass: 'dfaimyqmrfzpnkbo',
      },
    });
    this.configureTemplate();
  }

  configureTemplate() {
    const viewPath = resolve(__dirname, '..', 'data', 'views', 'emails');

    this.transporter.use(
      'compile',
      hbs({
        viewEngine: create({
          extname: '.hbs',
          layoutsDir: resolve(viewPath, 'layouts'),
          partialsDir: resolve(viewPath, 'partials'),
        }),
        viewPath,
        extName: '.hbs',
      })
    );
  }

  sendMail(message) {
    return this.transporter.sendMail({ ...message });
  }
}
export default new Mail();
