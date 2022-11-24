import { Request, Response, NextFunction } from 'express';
import { user } from '../models';
import { duplicateEmail, duplicateNickname, fixAjvError, invalidSignInfo, noRequiredArguments, undefinedError } from '../errors';
import { jwt } from '../utils';
import logger from '../utils';
import Ajv from 'ajv';

export const duplicateCheckBy = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const ajv = new Ajv({ useDefaults: false });
    const requestSchema = {
      type: 'object',
      properties: {
        email: { type: 'string' },
        nickname: { type: 'string' },
      },
    };
    const isValid = ajv.validate(requestSchema, req.query);

    if (!isValid) {
      return next(fixAjvError(ajv.errors!));
    }

    if (!req.query.nickname && !req.query.email) {
      return next(noRequiredArguments);
    }

    const key = req.query.nickname ? 'nickname' : 'email';
    return res.status(200).json({
      message: '중복 확인을 완료 했습니다.',
      data: await user.duplicateCheckBy({ [key]: req.query[key]?.toString() }),
    });
  } catch (error) {
    logger.error(error);
    return next(undefinedError);
  }
};

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

    if (!isValid && ajv.errors) {
      return next(fixAjvError(ajv.errors));
    }

    if (await user.duplicateCheckBy({ email: req.body.email })) {
      return next(duplicateEmail);
    }

    if (await user.duplicateCheckBy({ nickname: req.body.nickname })) {
      return next(duplicateNickname);
    }

    const newUserInfo = await user.signUp(req.body);

    delete newUserInfo!.password;

    return res.status(200).json({
      message: '회원가입에 성공했습니다.',
      data: {
        accessToken: jwt.generateAccessToken(newUserInfo),
        refreshToken: jwt.generateRefreshToken(newUserInfo),
      },
    });
  } catch (error) {
    logger.error(error);
    return next(undefinedError);
  }
};

export const signIn = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const ajv = new Ajv({ useDefaults: false });
    const requestSchema = {
      type: 'object',
      required: ['email', 'password'],
      properties: {
        email: { type: 'string' },
        password: { type: 'string' },
      },
    };
    const isValid = ajv.validate(requestSchema, req.body);

    if (!isValid) {
      return next(fixAjvError(ajv.errors!));
    }

    const userInfo = await user.get(req.body.email, req.body.password);
    if (!userInfo) {
      return next(invalidSignInfo);
    }

    delete userInfo!.password;

    return res.status(200).json({
      message: '로그인에 성공했습니다.',
      data: {
        accessToken: jwt.generateAccessToken(userInfo),
        refreshToken: jwt.generateRefreshToken(userInfo),
      },
    });
  } catch (error) {
    logger.error(error);
    return next(undefinedError);
  }
};

export const signOut = async (req: Request<never, never, never, never>, res: Response, next: NextFunction) => {
  try {
    user.signOut(req['tokenData'].id);
    return res.status(200).json({
      message: '회원 탈퇴를 성공했습니다.',
      data: null,
    });
  } catch (error) {
    logger.error(error);
    return next(undefinedError);
  }
};
