/**
 * @class BaseService
 */
export default class BaseService {
  /**
   * @method constructor
   * @param {object} model
   */
  constructor(model) {
    this.model = model;
  }

  /**
   * @method create
   * @description
   * @param {object} dataObject
   * @returns {object} created object
   */

  async create(dataObject) {
    const data = await this.model.create(dataObject);

    return data;
  }
  async findOne({ email }) {
    const user = await this.model.findOne({ where: { email } });
    return user;
  }
  async findAll() {
    try {
      const users = await this.model.findAll();

      return users;
    } catch (error) {}
  }
  async findAllSubscribe() {
    try {
      const users = await this.model.findAll({
        where: {
          subscribe: true,
        },
      });
      const [User] = users;
      return users.map(User => {
        return {
          username: User.dataValues.username,
          email: User.dataValues.email,
          subscribe: User.dataValues.subscribe,
        };
      });
    } catch (error) {}
  }
  async subscribe({ email }) {
    try {
      const user = await this.model.update(
        {
          subscribe: true,
        },
        {
          where: {
            email,
          },
        }
      );

      return user;
    } catch (error) {}
  }
  async unsubscribe({ email }) {
    const user = await this.model.update(
      {
        subscribe: false,
      },
      {
        where: {
          email,
        },
      }
    );

    return user;
  }
}
