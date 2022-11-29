import { AppDataSource } from '../data-source';
import { Todo, User } from '../entities';
import { PaginationData } from '../utils/pagination';

// 등록
export const create = async (category: string, context: string, userId: number) => {
  const user = await AppDataSource.getRepository(User).findOneBy({ id: userId });

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
  const todo = await todoRepository.findOne({
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

// 완료하기
export const complete = async (id: number, userId: number, isCompleted: boolean) => {
  // TODO: 캐릭터 경험치 올리기
  const todoRepository = AppDataSource.getRepository(Todo);
  const todo = await todoRepository.findOne({
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
    where: {
      users: {
        id: userId,
      },
      id,
    },
  });

  if (!todo) return;

  todo!.isCompleted = isCompleted;

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
      category: category,
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

  if (!category) delete query.where.category;

  const [list, count] = await todoRepository.findAndCount(query);

  return {
    list,
    count,
  };
};

// 삭제
export const remove = async (id: number, userId: number) => {
  const todoRepository = AppDataSource.getRepository(Todo);
  const todo = await todoRepository.findOne({
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
    where: {
      users: {
        id: userId,
      },
      id: id,
    },
  });

  if (!todo) return;

  todo.deletedAt = new Date();

  const result = await AppDataSource.manager.save(todo);

  return result;
};
