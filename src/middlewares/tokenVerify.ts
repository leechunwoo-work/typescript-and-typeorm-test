import { verify } from 'jsonwebtoken';
import httpError from '../errors';
import logger from '../utils';
import { NextFunction } from 'express';
import { TokenData, VerifyRequest } from '../interfaces/verify';
const JWT_KEY = process.env.JWT_KEY || '';

export default async (req: VerifyRequest, _, next: NextFunction) => {
    // 토큰 인증 미들웨어
    try {
        if (!req.headers.authorization) {
            return next(httpError.notVerifyUser);
        }

        // 토큰 인증
        const token = req.headers.authorization.split(' ')[1];
        req.token = verify(token, JWT_KEY) as TokenData;

        next();
    } catch (error) {
        logger.error(error);
        next(httpError.invalidToken);
    }
};
