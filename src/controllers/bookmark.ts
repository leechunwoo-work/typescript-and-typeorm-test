import { VerifyController } from '../interfaces';
import { bookmark } from '../models';
import httpError, { fixAjvError } from '../errors';
import logger from '../utils';
import Ajv from 'ajv';
const ajv = new Ajv({ useDefaults: false });

export const create: VerifyController = async (req, res, next) => {
  try {
    const requestSchema = {
      type: 'object',
      required: ['title', 'address', 'x', 'y'],
      properties: {
        title: { type: 'string', minLength: 1 },
        address: { type: 'string', minLength: 1 },
        x: { type: 'number' },
        y: { type: 'number' },
      },
    };
    const isValid = ajv.validate(requestSchema, req.body);

    if (!isValid) {
      return next(fixAjvError(ajv.errors!));
    }
    const { title, address, x, y } = req.body;
    const userId = req.token!.data.id;
    const { id } = await bookmark.create(userId, title, address, x, y);
    return res.status(200).json({
      message: '북마크 생성에 성공했습니다.',
      data: id,
    });
  } catch (error) {
    logger.error(error);
    return next(httpError.undefined);
  }
};

export const getList: VerifyController = async (req, res, next) => {
  try {
    const requestSchema = {
      type: 'object',
      properties: {
        page: { type: 'number' },
        limit: { type: 'number' },
      },
    };
    const isValid = ajv.validate(requestSchema, req.body);

    if (!isValid) {
      return next(fixAjvError(ajv.errors!));
    }

    const { page = 1, limit = 10 } = req.body;
    const userId = req.token!.data.id;
    const bookmarkList = await bookmark.getList(userId, page, limit);
    return res.status(200).json({
      message: '북마크 생성에 성공했습니다.',
      data: bookmarkList,
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
      required: ['id'],
      properties: {
        id: { type: 'number' },
        title: { type: 'string', minLength: 1 },
        x: { type: 'number' },
        y: { type: 'number' },
      },
    };
    const isValid = ajv.validate(requestSchema, req.body);

    if (!isValid) {
      return next(fixAjvError(ajv.errors!));
    }
    const { title, address, x, y } = req.body;
    const userId = req.token!.data.id;
    const updatedBookmarkData = await bookmark.update(userId, req.body.id, title, address, x, y);
    return res.status(200).json({
      message: '회원 정보 수정에 성공했습니다.',
      data: updatedBookmarkData,
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
      required: ['id'],
      properties: {
        id: { type: 'number' },
      },
    };
    const isValid = ajv.validate(requestSchema, req.body);

    if (!isValid) {
      return next(fixAjvError(ajv.errors!));
    }
    const userId = req.token!.data.id;
    bookmark.remove(userId, req.body.id);
    return res.status(200).json({
      message: '회원 정보 수정에 성공했습니다.',
      data: null,
    });
  } catch (error) {
    logger.error(error);
    return next(httpError.undefined);
  }
};
