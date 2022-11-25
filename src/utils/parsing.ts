import { TodoInfo, TodoResponseModel } from '../interfaces';

export const todo = (todoInfo: TodoInfo): TodoResponseModel => {
  return {
    id: todoInfo.id,
    createdAt: todoInfo.createdAt,
    context: todoInfo.context,
    category: todoInfo.category,
    experience: todoInfo.experience,
    isCompleted: todoInfo.isCompleted,
    isDeleted: !!todoInfo.deletedAt,
  };
};
