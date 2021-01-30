import dotenv from 'dotenv';
import { authService } from '../services/authService';
import nodeCron from 'node-cron';
import authHelper from '../helpers/auth';
import notifications from '../helpers/notifications';
import { comparePassword } from '../helpers/hashPassword';
dotenv.config();
const { UNSUBSCRIBELINK } = process.env;

/**
 * @class AuthController
 */
const task = nodeCron.schedule(
  '0 0 8-14 * 2',
  // '* * * * *',
  async () => {
    const allSubscribers = await authService.findAllSubscribe();
    allSubscribers.map(async email => {
      await notifications.sendEmail(
        email.email,
        UNSUBSCRIBELINK,
        email.username
      );
    });
  },
  {
    scheduled: false,
  }
);

export default class AuthController {
  /**
   * @method registerUser
   * @description registers a user with their email
   * @param {*} req
   * @param {*} res
   * @returns {object} registered user
   */
  static async registerUser(req, res) {
    try {
      const { body } = req;
      const userEmail = body.email;
      const checkUser = await authService.findOne({ email: userEmail });
      if (checkUser)
        return res.status(403).send({
          status: false,
          message: 'User already exist',
        });
      const user = await authService.create(body);
      const { id, email, username } = user;
      const verificationToken = authHelper.encode({
        id,
        email,
        username,
      });
      return res.status(200).send({
        status: true,
        token: verificationToken,
        user,
        message: `User with the mail ${email} has been created`,
      });
    } catch (error) {
      return res.status(500).send({
        status: false,
        message: 'something went wrong',
        error,
      });
    }
  }
  /**
   * @method loginUser
   * @description login a user with their email
   * @param {*} req
   * @param {*} res
   * @returns {object} login user
   */
  static async login(req, res) {
    try {
      const { body } = req;
      const userEmail = body.email;
      const userPassword = body.password;
      const checkUser = await authService.findOne({ email: userEmail });
      if (!checkUser)
        return res.status(401).send({
          status: false,
          message: 'Email incorrect',
        });
      const { id, email, username, subscribe, password } = checkUser;

      const matchPasswords = comparePassword(userPassword, password);
      if (!matchPasswords)
        return res.status(401).send({
          status: false,
          message: 'password incorrect',
        });

      const verificationToken = authHelper.encode({
        id,
        email,
        username,
      });
      return res.status(200).send({
        status: true,
        token: verificationToken,
        user: { id, email, username, subscribe },
        message: `User logged in`,
      });
    } catch (error) {
      return res.status(500).send({
        status: false,
        message: 'something went wrong',
        error,
      });
    }
  }
  /**
   * @method unsubscribeUser
   * @description unsubscribes a user with their email
   * @param {*} req
   * @param {*} res
   * @returns {object} unsubscribeed user
   */
  static async unsubscribe(req, res) {
    const { query } = req;
    const email = query.email;
    try {
      const user = await authService.unsubscribe({
        email,
      });
      return res.status(200).send({
        status: true,
        user,
        message: `The user with the mail ${email}. has been unsubscribe`,
      });
    } catch (error) {
      return res.status(500).send({
        status: false,
        message: 'something went wrong',
        error,
      });
    }
  }
  /**
   * @method sendNewsLetterUser
   * @description sends a user newsletter
   * @param {*} req
   * @param {*} res
   * @returns {object} news letter user
   */
  static async sendNewsLetter(req, res) {
    try {
      task.start();
      return res.status(200).send({
        status: true,
        message: `The weekly newsletter has been start`,
      });
    } catch (error) {
      return res.status(500).send({
        status: false,
        message: 'something went wrong',
        error,
      });
    }
  }

  /**
   * @method stopNewsLetterUser
   * @description sends a user newsletter
   * @param {*} req
   * @param {*} res
   * @returns {object} news letter user
   */
  static async stopNewsLetter(req, res) {
    try {
      task.stop();

      return res.status(200).send({
        status: true,
        message: `The weekly newsletter has been stopped`,
      });
    } catch (error) {
      return res.status(500).send({
        status: false,
        message: 'something went wrong',
        error,
      });
    }
  }
  /**
   * @method subscribeUser
   * @description subscribes a user with their email
   * @param {*} req
   * @param {*} res
   * @returns {object} subscribed user
   */
  static async subscribe(req, res) {
    const { query } = req;
    const email = query.email;

    try {
      const user = await authService.subscribe({
        email,
      });
      return res.status(200).send({
        status: true,
        user,
        message: `The user with the mail ${email}. has been subscribe`,
      });
    } catch (error) {
      return res.status(500).send({
        status: false,
        message: 'something went wrong',
        error,
      });
    }
  }
}
