import { verifyToken } from '../helpers/auth';
import models, { sequelize } from '../database/models';

export default async (req, res, next) => {
  const rawToken =
    req.headers.authorization ||
    req.headers['x-access-token'] ||
    req.body.token ||
    req.query.slt;

  if (!rawToken)
    return res.status(401).send({
      status: false,
      message: 'Provide a valid token',
    });

  try {
    const token = rawToken.split(' ')[1];
    const { email } = await verifyToken(token);
    const user = await models.User.findOne({
      where: { email },
      include: '',
    });
    if (!user)
      return res.status(401).send({
        status: false,
        message: 'Unathourized',
      });

    req.userData = user.dataValues;
    next();
  } catch (err) {
    const error = err.message ? 'Authentication Failed' : err;
    res.status(401).send({
      status: false,
      error,
    });
  }
};
