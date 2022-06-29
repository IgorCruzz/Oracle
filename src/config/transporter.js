import 'dotenv/config';

export default {
  host: process.env.MAIL_TRANSPORTER_HOST,
  port: process.env.MAIL_TRANSPORTER_PORT,
  auth: {
    user: process.env.MAIL_TRANSPORTER_USER,
    pass: process.env.MAIL_TRANSPORTER_PASSWORD,
  },
  from: process.env.MAIL_TRANSPORTER_USER,
};
