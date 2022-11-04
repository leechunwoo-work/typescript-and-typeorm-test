import { Request, Response, NextFunction } from 'express';
import Ajv from 'ajv';
import { Todo } from '../interfaces';
import { todo } from '../models';
import { undefinedError } from '../errors/code';

const ajv = new Ajv({ useDefaults: false });

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { category, context, experience }:
      { category: string, context: string, experience: number } = req.body;

    const schema = {
      type: 'object',
      properties: {
        category: { type: 'string', minLength: 1 },
        context: { type: 'string', minLength: 1 },
        experience: { type: 'number' },
      },
      required: ['category', 'context', 'experience'],
      additionalProperties: false,
    };

    const validate = ajv.compile(schema);

    if (validate(req.body)) {
      await todo.create(category, context, experience);
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    next(undefinedError);
  }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { category, context, experience, isComplete }:
      { category: string, context: string, experience: number, isComplete: boolean } = req.body;

    const schema = {
      type: 'object',
      properties: {
        category: { type: 'string', minLength: 1 },
        context: { type: 'string', minLength: 1 },
        experience: { type: 'number' },
      },
      required: ['category', 'context', 'experience'],
      additionalProperties: false,
    };

    const validate = ajv.compile(schema);

    if (validate(req.body)) {
      await todo.create(category, context, experience);
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    next(undefinedError);
  }
};
