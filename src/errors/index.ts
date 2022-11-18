import { ErrorObject } from 'ajv';

const errorRegister = (index: number) => {
  return (status: number, message: string) => {
    const padIndex = `${index++}`.padStart(3, '0');

    return {
      status: status,
      message: message,
      code: `ERR${status}${padIndex}`
    };
  };
};

const fixAjvError = (error: ErrorObject) => {
  switch (error.keyword) {
    case 'required':
      return {
        status: 400,
        message: `${error.params.missingProperty}가 입력되지 않았습니다.`,
        code: '',
      }
    case 'maxLength':
      return 1;
    case 'a':
      return 1;
    case 'b':
      return 1;
    case 'c':
      return 1;
    default:
      return null;
  }
}

export default fixAjvError;

const error400 = errorRegister(0);
const error500 = errorRegister(0);

export const undefinedError = error500(500, '알 수 없는 오류가 발생하였습니다.');