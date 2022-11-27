import { VerifyController } from '../interfaces';
import { bookmark } from '../models';
import httpError, { fixAjvError } from '../errors';
import logger, { jwt } from '../utils';
import Ajv from 'ajv';
const ajv = new Ajv({ useDefaults: false });

export const create: VerifyController = async (req, res, next) => {
  try {
    const requestSchema = {
      type: 'object',
      required: ['title', 'x', 'y'],
      properties: {
        title: { type: 'string' },
        x: { type: 'number' },
        y: { type: 'number' },
      },
    };
    const isValid = ajv.validate(requestSchema, req.body);

    if (!isValid) {
      return next(fixAjvError(ajv.errors!));
    }

    const { title, x, y } = req.body;
    bookmark.create(title, x, y);
    return res.status(200).json({
      message: '북마크 생성에 성공했습니다.',
      data: {},
    });
  } catch (error) {
    logger.error(error);
    return next(httpError.undefined);
  }
};

export const remove: VerifyController = async (req, res, next) => {
  try {
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
      return next(httpError.invalidSignInfo);
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
    return next(httpError.undefined);
  }
};

export const getList: VerifyController = async (req, res, next) => {
  try {
    if (!(await user.withdrawal(req.token!.data.id))) {
      throw Error('회원 탈퇴를 실패했습니다.');
    }
    return res.status(200).json({
      message: '회원 탈퇴를 성공했습니다.',
      data: null,
    });
  } catch (error) {
    logger.error(error);
    return next(httpError.undefined);
  }
};

export const update: VerifyController = async (req, res, next) => {
  try {
    const requestSchema = {
      type: 'object',
      properties: {
        nickname: { type: 'string' },
        password: { type: 'string' },
        isChallengeNotificationEnabled: { type: 'boolean' },
        isUltrafineDustNotificationEnabled: { type: 'boolean' },
      },
    };
    const isValid = ajv.validate(requestSchema, req.body);

    if (!isValid) {
      return next(fixAjvError(ajv.errors!));
    }
    const updatedUserData = await user.update(req.token!.data.id, req.body);
    delete updatedUserData?.password;
    res.status(201).json({
      message: '회원 정보 수정에 성공했습니다.',
      data: updatedUserData,
    });
  } catch (error) {
    logger.error(error);
    return next(httpError.undefined);
  }
};
