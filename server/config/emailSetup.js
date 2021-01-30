/* eslint-disable no-console */
import nodemailer from 'nodemailer';

import dotenv from 'dotenv';

import sendGridMail from '@sendgrid/mail';

dotenv.config();
const { NODE_ENV, SENDGRID_API_KEY, USER_PASSWORD, USER_MAIL } = process.env;

sendGridMail.setApiKey(SENDGRID_API_KEY);

const mailSender = async mailData => {
  try {
    const data = {
      from: `"Queue newsletter" <no-reply@mailsenderqueue.com>`,
      to: mailData.emailTo,
      subject: mailData.subject,
      html: mailData.message,
    };
    if (NODE_ENV === 'test' || NODE_ENV === 'development') {
      const account = await nodemailer.createTestAccount();
      console.log(
        'Message account.user, pass: account.pass : %s',
        account.user,
        account.pass
      );

      const transporter = await nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: { user: account.user, pass: account.pass },
      });

      const info = await transporter.sendMail(data);
      console.log('Message sent: %s', info.messageId);
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    } else {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: `${USER_MAIL}`,
          pass: `${USER_PASSWORD}`, //naturally, replace  both with your real credentials or an application-specific password
        },
      });

      transporter.sendMail(data, function(error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
    }
  } catch (error) {
    console.log(error, 'Mail Error');
  }
};

export default { mailSender };
