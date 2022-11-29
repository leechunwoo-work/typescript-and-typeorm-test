import { VerifyController } from '../interfaces';
import Ajv from 'ajv';
import logger, { processing } from '../utils';
import { character } from '../models';
import httpError, { fixAjvError } from '../errors';
import { TodoInfo, TodoResponseModel } from '../interfaces';

const ajv = new Ajv({ useDefaults: false });

// 대표 캐릭터 선택
export const select: VerifyController = async (req, res, next) => {
  try {
    const userId = req.token!.data.id;

    const { characterId } = req.body;

    const schema = {
      type: 'object',
      properties: {
        characterId: { type: 'number' },
      },
      required: ['characterId'],
      additionalProperties: false,
    };

    const validate = ajv.compile(schema);

    if (!validate(req.body) && validate.errors) {
      return next(fixAjvError(validate.errors));
    }

    const characterInfo = await character.select(userId, characterId);

    // const processingData: TodoResponseModel = processing.todo(newTodo);

    return res.status(201).send({
      message: '캐릭터 선택이 완료되었습니다.',
      data: characterInfo,
    });
  } catch (error) {
    logger.error(error);
    return next(httpError.undefined);
  }
};

// 대표 캐릭터 변경
export const change: VerifyController = async (req, res, next) => {
  try {
  } catch (error) {
    logger.error(error);
    return next(httpError.undefined);
  }
};

// 대표 캐릭터 조회
export const find: VerifyController = async (req, res, next) => {
  try {
    const userId = req.token!.data.id;

    const characterInfo = await character.find(userId);

    return res.status(200).send({
      data: characterInfo,
    });
  } catch (error) {
    logger.error(error);
    return next(httpError.undefined);
  }
};

// 생성
export const create: VerifyController = async (req, res, next) => {
  try {
    // TODO: 관리자인지 확인

    const { type, name, levelMaxExperience } = req.body;

    const schema = {
      type: 'object',
      properties: {
        type: { type: 'number' },
        name: { type: 'string' },
        levelMaxExperience: { type: 'array' },
      },
      required: ['type', 'name', 'levelMaxExperience'],
      additionalProperties: false,
    };

    const validate = ajv.compile(schema);

    if (!validate(req.body) && validate.errors) {
      return next(fixAjvError(validate.errors));
    }

    const characterInfo = await character.create(type, name, levelMaxExperience);

    // const processingData: TodoResponseModel = processing.todo(newTodo);

    return res.status(201).send({
      message: '캐릭터 선택이 완료되었습니다.',
      data: characterInfo,
    });
  } catch (error) {
    logger.error(error);
    return next(httpError.undefined);
  }
};

// 수정
export const update: VerifyController = async (req, res, next) => {
  try {
  } catch (error) {
    logger.error(error);
    return next(httpError.undefined);
  }
};

// 목록
export const getList: VerifyController = async (req, res, next) => {
  try {
  } catch (error) {
    logger.error(error);
    return next(httpError.undefined);
  }
};

// 삭제
export const remove: VerifyController = async (req, res, next) => {
  try {
  } catch (error) {
    logger.error(error);
    return next(httpError.undefined);
  }
};
