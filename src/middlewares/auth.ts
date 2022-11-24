import { verify } from 'jsonwebtoken';
import { invalidToken, notVerifyUser } from '../errors';
import logger from '../utils';
const JWT_KEY = process.env.JWT_KEY || '';

module.exports = async (req, _, next) => {
  // 토큰 인증 미들웨어
  try {
    if (!req.headers.authorization) {
      return next(notVerifyUser);
    }

    // 관리자 토큰 인증
    const token = req.headers.authorization.split(' ')[1];
    req.tokenData = verify(token, JWT_KEY);

    next();
  } catch (error) {
    logger.error(error);
    next(invalidToken);
  }
};
