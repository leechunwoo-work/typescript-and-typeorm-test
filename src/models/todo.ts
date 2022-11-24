import { AppDataSource } from '../data-source';
import { Todo } from '../entities';
import { TodoInfo } from '../interfaces';
import { PaginationData } from '../utils/pagination';

// 등록
export const create = async (category: string, context: string) => {
  const todo = new Todo();
  todo.category = category;
  todo.context = context;

  const result = await AppDataSource.manager.save(todo);

  return result;
};

// 수정
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

// 목록
export const getList = async (page: number, limit: number, category?: string) => {
  const { offset } = new PaginationData(page, limit);

  const todoRepository = AppDataSource.getRepository(Todo);
  const [list, count] = await todoRepository.findAndCount({
    select: {
      id: true,
      category: true,
      context: true,
      experience: true,
      createdAt: true,
      deletedAt: true,
      isCompleted: true,
    },
    skip: offset,
    take: limit,
  });

  return {
    list,
    count,
  };
};

// 완료 처리
export const complete = async (id: number, isCompleted: boolean) => {
  const todoRepository = AppDataSource.getRepository(Todo);
  const todo: {
    id: number;
    isCompleted: boolean;
  } | null = await todoRepository.findOne({
    select: {
      id: true,
      isCompleted: true,
    },
    where: {
      id,
    },
  });

  if (!todo) return;

  todo!.isCompleted = isCompleted;
  const result = await todoRepository.save(todo);

  return result;
};
