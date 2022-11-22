import { Request, Response, NextFunction } from 'express';
import Ajv from 'ajv';
import logger from '../utils';
import { todo } from '../models';
import { undefinedError, fixAjvError } from '../errors';

const ajv = new Ajv({ useDefaults: false });

export const create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
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
      next(fixAjvError(validate.errors[0]));
    }

    const newTodo = await todo.create(category, context);

    res.status(201).send({
      message: 'TODO가 추가되었습니다.',
      data: newTodo,
    });
  } catch (error) {
    logger.error(error);
    next(undefinedError);
  }
};

export const update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id, category, context } = req.body;

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
      next(fixAjvError(validate.errors[0]));
    }

    const latestTodo = await todo.update(id, category, context);

    res.status(201).send({
      message: 'TODO가 수정되었습니다.',
      data: latestTodo,
    });
  } catch (error) {
    logger.error(error);
    next(undefinedError);
  }
};
