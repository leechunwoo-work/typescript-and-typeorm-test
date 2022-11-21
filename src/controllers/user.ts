import { Request, Response, NextFunction } from 'express';
import logger from '../utils/winston';
import Ajv from 'ajv';
import { user } from '../models';

export const signUp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const ajv = new Ajv({ useDefaults: false });
    const requestSchema = {
      type: 'object',
      required: [
        'nickname',
        'password',
        'email',
        'pushToken',
        'authenticationType',
        'isChallengeNotificationEnabled',
        'isUltrafineDustNotificationEnabled',
      ],
      properties: {
        nickname: { type: 'string' },
        password: { type: 'string' },
        email: {
          type: 'string',
          allOf: [{ format: 'email' }, { text: ['lowercase', 'trim'] }],
        },
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

    const {
      nickname,
      password,
      email,
      pushToken,
      authenticationType,
      isChallengeNotificationEnabled,
      isUltrafineDustNotificationEnabled,
    } = req.body;

    user.signUp(
      nickname,
      password,
      email,
      pushToken,
      authenticationType,
      isChallengeNotificationEnabled,
      isUltrafineDustNotificationEnabled
    );
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      message: error.message,
      data: null,
    });
  }
};
