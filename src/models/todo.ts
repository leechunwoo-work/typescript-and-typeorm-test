import { AppDataSource } from '../data-source';
import { Todo, User } from '../entities';
import { PaginationData } from '../utils/pagination';

// 추천 등록
export const use = async (todoId: number, userId: number) => {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOne({
    where: {
      id: userId,
    },
  });

  const todoRepository = AppDataSource.getRepository(Todo);
  const todo = await todoRepository.findOne({
    where: {
      id: todoId,
    },
  });

  if (!user) return '';
  if (!todo) return '';

  // 관계 연결
  todo.users = [user];

  const result = await AppDataSource.manager.save(todo);

  return result;
};

// 등록
export const create = async (category: string, context: string, userId: number) => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOne({
    where: {
      id: userId,
    },
  });

  const todo = new Todo();
  todo.category = category;
  todo.context = context;

  // 관계 연결
  if (user) {
    todo.users = [user];
  }

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
export const getList = async (userId: number, page: number, limit: number, category?: string) => {
  const { offset } = new PaginationData(page, limit);

  const todoRepository = AppDataSource.getRepository(Todo);
  const query = {
    relations: { users: true },
    where: {
      users: {
        id: userId,
      },
    },
    select: {
      id: true,
      category: true,
      context: true,
      experience: true,
      createdAt: true,
      deletedAt: true,
      isCompleted: true,
      users: {
        id: false,
      },
    },
    skip: offset,
    take: limit,
  };

  const [list, count] = await todoRepository.findAndCount(query);

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
