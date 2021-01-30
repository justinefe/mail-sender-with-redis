import emailService from '../config/emailSetup';
import sendMailQueue from '../config/bullConfig';
import template from './template';

/**
 *
 * @param {*} emailTo
 * @param {*} link
 * @param {*} name
 * @returns {*} sends an email to a new user
 */
const registrationEmail = (emailTo, link, name) => {
  const subject = 'Welcome to Bull';
  const body = `<p>Dear ${name},</p>
  <p>We are thrilled to have you.</p>
  <p>Some random message with link</p>
      <a href="${link}" class="button">Confirm email</a>`;
  const message = template(subject, body, emailTo);
  const data = { emailTo, subject, message };
  emailService.mailSender(data);
};

const sendEmail = (emailTo, link, name) => {
  const subject = 'Welcome to the weekly newsletter subscription';
  const body = `<p>Dear ${name},</p>
  <p>We are thrilled to have you. You will be receiving this letter every Tuesday 9am </p>
  <p>I hope you have a nice time reading</p>`;
  const message = template(subject, body, emailTo);
  const data = { emailTo, subject, message };
  sendMailQueue.add(data, {
    attempts: 1,
  });
  // emailService.mailSender(data);
};
sendMailQueue.process(async (job, done) => {
  emailService.mailSender(job.data);
  done();
});

const Notifications = { registrationEmail, sendEmail };

export default Notifications;
