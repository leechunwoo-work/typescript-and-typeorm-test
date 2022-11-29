import { ErrorObject } from 'ajv';

// 400 Error
export const fixAjvError = (errors: ErrorObject[]) => {
  switch (errors[0].keyword) {
    case 'required':
      return {
        status: 400,
        message: `${errors[0].params.missingProperty}(이)가 입력되지 않았습니다.`,
        code: 'ERR400100',
      };

    case 'maxLength':
    case 'minLength':
      return {
        status: 400,
        message: `${errors[0].instancePath.replace('/', '')}의 길이를 확인해주세요.`,
        code: 'ERR400101',
      };

    case 'type':
      return {
        status: 400,
        message: `${errors[0].instancePath.replace('/', '')}은(는) ${errors[0].params.type}(으)로 보내주셔야합니다.`,
        code: 'ERR400102',
      };

    default:
      return null;
  }
};

export default {
  notFoundTodo: {
    status: 404,
    message: '존재하지 않는 Todo입니다.',
    code: 'ERR404101',
  },

  duplicateEmail: {
    status: 400,
    message: '이미 존재하는 email입니다.',
    code: 'ERR400102',
  },

  duplicateNickname: {
    status: 400,
    message: '이미 존재하는 nickname입니다.',
    code: 'ERR400102',
  },

  noRequiredArguments: {
    status: 400,
    message: '인자가 없습니다.',
    code: 'ERR400102',
  },

  notVerifyUser: {
    status: 403,
    message: '인증 절차가 이루어지지 않은 유저입니다.',
    code: 'ERR403103',
  },

  invalidToken: {
    status: 401,
    message: '잘못된 토큰입니다.',
    code: 'ERR401104',
  },

  invalidSignInfo: {
    status: 400,
    message: '아이디 또는 비밀번호를 잘못 입력했습니다.',
    code: 'ERR400005',
  },

  undefined: {
    status: 500,
    message: '알 수 없는 오류가 발생하였습니다.',
    code: 'ERR999999',
  },
};
