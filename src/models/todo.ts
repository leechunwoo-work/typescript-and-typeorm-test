import { AppDataSource } from '../data-source';
import { Todo } from '../entities';
import { TodoInfo } from '../interfaces';

export const create = async (category: string, context: string) => {
  const todo = new Todo();
  todo.category = category;
  todo.context = context;

  const result = await AppDataSource.manager.save(todo);

  return result;
};

export const update = async (id: number, userId: number, category: string, context: string) => {
  const todoRepository = AppDataSource.getRepository(Todo);
  const todo: {
    id: number;
    category: string;
    context: string;
  } | null = await todoRepository.findOne({
    select: {
      id: true,
      category: true,
      context: true,
    },
    where: {
      id,
    },
  });

  if (!todo) return;

  todo!.category = category;
  todo!.context = context;
  const result = await todoRepository.save(todo);

  return result;
};

// export const getList = async (page: number, limit: number) => {
//   const todoRepository = AppDataSource.getRepository(Todo);
//   const todo: TodoInfo[] = await todoRepository.find({

//   });

// };

export const complete = async (id: number, isComplete: boolean) => {
};
