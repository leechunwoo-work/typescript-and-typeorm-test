import { AppDataSource } from '../migrations/data-source';
import { Todo } from '../entities';

export const create = async (category: string, context: string, experience: number) => {
  const info = {
    category,
    context,
    experience: experience,
  };

  const todoRepository = AppDataSource.getRepository(Todo);
  const todoInfo = todoRepository.create(info);
  const result = await todoRepository.save(todoInfo);

  return result;
};
