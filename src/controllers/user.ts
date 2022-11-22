import { Request, Response, NextFunction } from 'express';
import logger from '../utils';
import Ajv from 'ajv';
import { user } from '../models';

export const signUp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const ajv = new Ajv({ useDefaults: false });
    const requestSchema = {
      type: 'object',
      required: [
        'email',
        'password',
        'nickname',
        'authenticationStatus',
        'isChallengeNotificationEnabled',
        'isUltrafineDustNotificationEnabled',
      ],
      properties: {
        email: {
          type: 'string',
        },
        nickname: { type: 'string' },
        password: { type: 'string' },
        pushToken: { type: 'string' },
        isChallengeNotificationEnabled: { type: 'boolean' },
        isUltrafineDustNotificationEnabled: { type: 'boolean' },
      },
    };
    const isValid = ajv.validate(requestSchema, req.body);

    if (!isValid) {
      res.status(400).json({
        message: ajv.errorsText(),
        data: null,
      });
    }

    user.signUp(req.body);

    res.status(200).json({
      message: '회원가입에 성공했습니다.',
      data: null,
    });
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      message: error.message,
      data: null,
    });
  }
};
