"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }require('dotenv/config');
var _nodemailer = require('nodemailer'); var _nodemailer2 = _interopRequireDefault(_nodemailer);
var _nodemailerexpresshandlebars = require('nodemailer-express-handlebars'); var _nodemailerexpresshandlebars2 = _interopRequireDefault(_nodemailerexpresshandlebars);
var _path = require('path'); var _path2 = _interopRequireDefault(_path);
var _transporter = require('../../config/transporter'); var _transporter2 = _interopRequireDefault(_transporter);

exports. default = {
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

      const transporter = _nodemailer2.default.createTransport({
        ..._transporter2.default,
      });

      transporter.use(
        'compile',
        _nodemailerexpresshandlebars2.default.call(void 0, {
          viewEngine: {
            extName: '.handlebars',
            partialsDir: _path2.default.resolve(__dirname, '..', 'templates'),
            defaultLayout: false,
          },
          viewPath: _path2.default.resolve(__dirname, '..', 'templates'),
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
