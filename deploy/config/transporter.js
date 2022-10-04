"use strict";Object.defineProperty(exports, "__esModule", {value: true});require('dotenv/config');

exports. default = {
  host: process.env.MAIL_TRANSPORTER_HOST,
  port: process.env.MAIL_TRANSPORTER_PORT,
  auth: {
    user: process.env.MAIL_TRANSPORTER_USER,
    pass: process.env.MAIL_TRANSPORTER_PASSWORD,
  },
  from: process.env.MAIL_TRANSPORTER_USER,
};
