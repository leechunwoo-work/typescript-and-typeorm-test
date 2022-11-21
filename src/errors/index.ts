import { ErrorObject } from 'ajv';

export const fixAjvError = (error: ErrorObject) => {
  switch (error.keyword) {
    case 'required':
      return {
        status: 404,
        message: `${error.params.missingProperty}(이)가 입력되지 않았습니다.`,
        code: 'ERR404100',
      };

    case 'maxLength':
    case 'minLength':
      return {
        status: 400,
        message: `${error.instancePath.replace('/', '')}의 길이를 확인해주세요.`,
        code: 'ERR400100',
      };

    case 'type':
      return {
        status: 400,
        message: `${error.instancePath.replace('/', '')}은(는) ${error.params.type}(으)로 보내주셔야합니다.`,
        code: 'ERR400101',
      };

    default:
      return null;
  }
};

export const undefinedError = {
  status: 500,
  message: '알 수 없는 오류가 발생하였습니다.',
  code: 'ERR999999',
};
