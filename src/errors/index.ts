import { ErrorObject } from 'ajv';

export const fixAjvError = (errors: ErrorObject[]) => {
  switch (errors[0].keyword) {
    case 'required':
      return {
        status: 404,
        message: `${errors[0].params.missingProperty}(이)가 입력되지 않았습니다.`,
        code: 'ERR404100',
      };

    case 'maxLength':
    case 'minLength':
      return {
        status: 400,
        message: `${errors[0].instancePath.replace('/', '')}의 길이를 확인해주세요.`,
        code: 'ERR400100',
      };

    case 'type':
      return {
        status: 400,
        message: `${errors[0].instancePath.replace('/', '')}은(는) ${errors[0].params.type}(으)로 보내주셔야합니다.`,
        code: 'ERR400101',
      };

    default:
      return null;
  }
};

export const notFoundTodo = {
  status: 404,
  message: '존재하지 않는 Todo입니다.',
  code: 'ERR404101',
};

export const duplicateEmail = {
  status: 400,
  message: '이미 존재하는 email입니다.',
  code: 'ERR400102',
};

export const duplicateNickname = {
  status: 400,
  message: '이미 존재하는 nickname입니다.',
  code: 'ERR400102',
};

export const noRequiredArguments = {
  status: 400,
  message: '인자가 없습니다.',
  code: 'ERR400102',
};

export const notVerifyUser = {
  status: 403,
  message: '인증 절차가 이루어지지 않은 유저입니다.',
  code: 'ERR403103',
};

export const invalidToken = {
  status: 401,
  message: '잘못된 토큰입니다.',
  code: 'ERR401104',
};

export const invalidSignInfo = {
  status: 400,
  message: '아이디 또는 비밀번호를 잘못 입력했습니다.',
  code: 'ERR400005',
};

export const undefinedError = {
  status: 500,
  message: '알 수 없는 오류가 발생하였습니다.',
  code: 'ERR999999',
};
