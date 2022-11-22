import { Request, Response, NextFunction } from 'express';
import Ajv from 'ajv';
import logger from '../utils';
import { todo } from '../models';
import { undefinedError, fixAjvError, notFoundTodo } from '../errors';

const ajv = new Ajv({ useDefaults: false });

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
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

    const newTodo = await todo.create(category, context);

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
