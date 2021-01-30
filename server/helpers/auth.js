import jwt from 'jsonwebtoken';
const secret = process.env.SECRETKEY;

const authHelper = {
  /**
   * @method encode
   * @description
   * @param {dataObject} data to be encoded
   * @returns {token} encoded user token
   */
  encode: data => {
    const token = jwt.sign(data, secret, { expiresIn: '72h' });
    return token;
  },
};
export async function verifyToken(token, callBack) {
  return jwt.verify(token, secret, callBack);
}
export default authHelper;
