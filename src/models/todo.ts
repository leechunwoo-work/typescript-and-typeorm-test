import { AppDataSource } from '../migrations/data-source';
import { Todo } from '../entities';

export const create = async (category: string, context: string) => {
  const todo = new Todo();
  todo.category = category;
  todo.context = context;

  const result = await AppDataSource.manager.save(todo);

  return result;
};

export const update = async (id: number, category: string, context: string) => {
  const info = {
    id,
    category,
    context,
  };

  const todoRepository = AppDataSource.getRepository(Todo);
  const todoInfo = await todoRepository.findOneBy({ id });
  const result = await todoRepository.save(todoInfo);

  return result;
};
