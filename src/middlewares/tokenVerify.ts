import { verify } from 'jsonwebtoken';
import { invalidToken, notVerifyUser } from '../errors';
import logger from '../utils';
import { Request, NextFunction } from 'express';
const JWT_KEY = process.env.JWT_KEY || '';

export default async (req, _, next: NextFunction) => {
  // 토큰 인증 미들웨어
  try {
    if (!req.headers.authorization) {
      return next(notVerifyUser);
    }

    // 토큰 인증
    const token = req.headers.authorization.split(' ')[1];
    req.token = verify(token, JWT_KEY);

    next();
  } catch (error) {
    logger.error(error);
    next(invalidToken);
  }
};
