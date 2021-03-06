import express from 'express';
import controllers from '../controllers';
import middlewares from '../middlewares';

const { registrationMiddleware, loginMiddleware } = middlewares;
const { authController } = controllers;

const authRoute = express.Router();

authRoute.post(
  '/register',
  registrationMiddleware,
  authController.registerUser
);
authRoute.patch('/unsubscribe', authController.unsubscribe);
authRoute.patch('/subscribe', authController.subscribe);
authRoute.post('/send', authController.sendNewsLetter);
authRoute.post('/stop', authController.stopNewsLetter);
authRoute.post('/login', loginMiddleware, authController.login);
export default authRoute;
