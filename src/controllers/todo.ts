import { Request, Response, NextFunction } from 'express';
import { VerifyRequest } from '../interfaces';
import Ajv from 'ajv';
import logger from '../utils';
import { todo } from '../models';
import { undefinedError, fixAjvError, notFoundTodo } from '../errors';
import { TodoInfo } from '../interfaces';

const ajv = new Ajv({ useDefaults: false });

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = {
      id: 16,
    };

    const userId = user.id;

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

    return res.status(201).send({
      message: 'TODO가 추가되었습니다.',
      data: newTodo,
    });
  } catch (error) {
    logger.error(error);
    return next(undefinedError);
  }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id, userId, category, context } = req.body;

    const schema = {
      type: 'object',
      properties: {
        id: { type: 'number' },
        userId: { type: 'number' },
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

    if (!updateTodo) {
      return next(notFoundTodo);
    }

    return res.status(201).send({
      message: 'TODO가 수정되었습니다.',
      data: updateTodo,
    });
  } catch (error) {
    logger.error(error);
    return next(undefinedError);
  }
};

export const complete = async (req: Request, res: Response, next: NextFunction) => {
  try {
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

    const completeTodo = await todo.complete(id, isCompleted);

    if (!completeTodo) {
      return next(notFoundTodo);
    }

    return res.status(201).send({
      message: 'TODO를 완료하였습니다.',
      data: completeTodo,
    });
  } catch (error) {
    logger.error(error);
    return next(undefinedError);
  }
};

export const getList = async (req: VerifyRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.token!.data.id;
    const { page, limit } = req.query;

    const schema = {
      type: 'object',
      properties: {
        page: { type: 'string' },
        limit: { type: 'string' },
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

    const getTodo = await todo.getList(userId, pageNo, limitNo, 'category');

    getTodo.list.map((el: TodoInfo) => {
      el.isDeleted = !el.deletedAt;
      delete el.deletedAt;

      return el;
    });

    if (!getTodo.list.length) {
      return res.status(200).send({
        message: 'TODO 목록이 비어있습니다.',
        data: [],
      });
    }

    return res.status(200).send({
      message: 'TODO목록 요청에 성공하였습니다.',
      data: getTodo.list,
      total: getTodo.count,
    });
  } catch (error) {
    logger.error(error);
    return next(undefinedError);
  }
};
