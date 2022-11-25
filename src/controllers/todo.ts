import { Response, NextFunction } from 'express';
import { VerifyRequest } from '../interfaces';
import Ajv from 'ajv';
import logger, { parsing } from '../utils';
import { todo } from '../models';
import { undefinedError, fixAjvError, notFoundTodo } from '../errors';
import { TodoInfo, TodoResponseModel } from '../interfaces';

const ajv = new Ajv({ useDefaults: false });

// 등록
export const create = async (req: VerifyRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.token!.data.id;

    const { category, context } = req.body;

    const schema = {
      type: 'object',
      properties: {
        category: { type: 'string', minLength: 1 },
        context: { type: 'string', minLength: 1 },
      },
      required: ['category', 'context'],
      additionalProperties: false,
    };

    const validate = ajv.compile(schema);

    if (!validate(req.body) && validate.errors) {
      return next(fixAjvError(validate.errors));
    }

    const newTodo = await todo.create(category, context, userId);

    const parsingData = parsing.todo(newTodo);

    return res.status(201).json({
      message: 'TODO가 추가되었습니다.',
      data: parsingData,
    });
  } catch (error) {
    logger.error(error);
    return next(undefinedError);
  }
};

// 수정
export const update = async (req: VerifyRequest, res: Response, next: NextFunction) => {
  try {
    const { id, category, context } = req.body;
    const userId = req.token!.data.id;

    const schema = {
      type: 'object',
      properties: {
        id: { type: 'number' },
        category: { type: 'string', minLength: 1 },
        context: { type: 'string', minLength: 1 },
      },
      required: ['id', 'category', 'context'],
      additionalProperties: false,
    };

    const validate = ajv.compile(schema);

    if (!validate(req.body) && validate.errors) {
      return next(fixAjvError(validate.errors));
    }

    const updateTodo = await todo.update(id, userId, category, context);

    if (!updateTodo) return next(notFoundTodo);

    const parsingData: TodoResponseModel = parsing.todo(updateTodo);

    return res.status(201).json({
      message: 'TODO가 수정되었습니다.',
      data: parsingData,
    });
  } catch (error) {
    logger.error(error);
    return next(undefinedError);
  }
};

// 완료하기
export const complete = async (req: VerifyRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.token!.data.id;
    const { id, isCompleted } = req.body;

    const schema = {
      type: 'object',
      properties: {
        id: { type: 'number' },
        isCompleted: { type: 'boolean' },
      },
      required: ['id', 'isCompleted'],
      additionalProperties: false,
    };

    const validate = ajv.compile(schema);

    if (!validate(req.body) && validate.errors) {
      return next(fixAjvError(validate.errors));
    }

    const completeTodo = await todo.complete(id, userId, isCompleted);

    if (!completeTodo) return next(notFoundTodo);

    const parsingData: TodoResponseModel = parsing.todo(completeTodo);

    return res.status(201).json({
      message: 'TODO를 완료하였습니다.',
      data: parsingData,
    });
  } catch (error) {
    logger.error(error);
    return next(undefinedError);
  }
};

// 목록
export const getList = async (req: VerifyRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.token!.data.id;
    const { page, limit, category } = req.query;

    const schema = {
      type: 'object',
      properties: {
        page: { type: 'string' },
        limit: { type: 'string' },
        category: { type: 'string' },
      },
      required: ['page', 'limit'],
      additionalProperties: false,
    };

    const validate = ajv.compile(schema);

    if (!validate(req.query) && validate.errors) {
      return next(fixAjvError(validate.errors));
    }

    const pageNo = parseInt((page as string) || '');
    const limitNo = parseInt((limit as string) || '');

    const getTodo = await todo.getList(userId, pageNo, limitNo, (category as string) || '');

    getTodo.list.map((el: TodoInfo) => {
      el.isDeleted = !!el.deletedAt;
      delete el.deletedAt;

      return el;
    });

    if (!getTodo.list.length) {
      return res.status(200).json({
        message: 'TODO 목록이 비어있습니다.',
        data: [],
      });
    }

    return res.status(200).json({
      message: 'TODO목록 요청에 성공하였습니다.',
      data: getTodo.list,
      total: getTodo.count,
    });
  } catch (error) {
    logger.error(error);
    return next(undefinedError);
  }
};

// 삭제
export const remove = async (req: VerifyRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.token!.data.id;
    const { id } = req.query;

    const schema = {
      type: 'object',
      properties: {
        id: { type: 'string' },
      },
      required: ['id'],
      additionalProperties: false,
    };

    const validate = ajv.compile(schema);

    if (!validate(req.query) && validate.errors) {
      return next(fixAjvError(validate.errors));
    }

    if (!id) return;

    const removeTodo = await todo.remove(parseInt(id as string), userId);

    if (!removeTodo) return next(notFoundTodo);

    const parsingData = parsing.todo(removeTodo);

    return res.status(200).json({
      message: 'TODO가 삭제되었습니다.',
      data: parsingData,
    });
  } catch (error) {
    logger.error(error);
    return next(undefinedError);
  }
};
