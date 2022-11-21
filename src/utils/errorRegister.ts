export const errorRegister = (index: number) => {
  return (status: number, message: string) => {
    const padIndex = `${index++}`.padStart(3, '0');

    return {
      status: status,
      message: message,
      code: `ERR${status}${padIndex}`,
    };
  };
};
