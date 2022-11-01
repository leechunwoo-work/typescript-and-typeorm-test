import { Router, Request, Response } from 'express';
import Ajv, { JSONSchemaType } from 'ajv';

const router = Router();

router.post('/', (req: Request, res: Response) => {
  interface TestData {
    id: string;
    password: string;
  }

  const ajv = new Ajv({ useDefaults: false });

  const schema: JSONSchemaType<TestData> = {
    type: 'object',
    properties: {
      id: { type: 'string', minLength: 1, maxLength: 10 },
      password: { type: 'string' },
    },
    required: ['id'],
    additionalProperties: false,
  };

  const validate = ajv.compile(schema);

  if (validate(req.body)) {
    console.log('success', req.body);
  } else {
    console.log('fail', validate.errors);
  }
});

export default router;
