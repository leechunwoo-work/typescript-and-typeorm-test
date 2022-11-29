import { Bookmark } from '../entities';
import { User } from '../entities';
import { AppDataSource } from '../data-source';
import { PaginationData } from '../utils/pagination';

export const create = async (userId: number, title: string, x: number, y: number) => {
  const user = await AppDataSource.getRepository(User).findOneBy({ id: userId });
  const bookmark = new Bookmark();
  bookmark.title = title;
  bookmark.geoPoint = { type: 'Point', coordinates: [x, y] };
  if (!user) {
    throw Error(`없는 유저(id: ${userId})에 북마크를 추가하려 했습니다.`);
  }
  bookmark.user = user;
  return await AppDataSource.manager.save(bookmark);
};

export const getList = async (userId: number, page: number, limit: number) => {
  const { offset } = new PaginationData(page, limit);
  const bookmarkTable = AppDataSource.manager.getRepository(Bookmark);
  const [list, count] = await bookmarkTable.findAndCount({
    relations: { user: true },
    where: {
      user: {
        id: userId,
      },
    },
    select: {
      user: {
        id: false,
      },
    },
    skip: offset,
    take: limit,
  });

  return {
    list,
    count,
  };
};

export const update = async (userId: number, bookmarkId: number, title?: string, x?: number, y?: number) => {
  const userBookmark = AppDataSource.manager.getRepository(Bookmark);
  const targetBookmark = await userBookmark.findOne({
    relations: { user: true },
    where: {
      id: bookmarkId,
      user: {
        id: userId,
      },
    },
    select: {
      user: {
        id: false,
      },
    },
  });
  if (!targetBookmark) {
    throw Error('없는 북마크를 수정 하려고 했습니다. 북마크 수정에 실패 했습니다.');
  }

  targetBookmark.title = title ? title : targetBookmark.title;
  targetBookmark.geoPoint.coordinates[0] = x ? x : targetBookmark.geoPoint.coordinates[0];
  targetBookmark.geoPoint.coordinates[1] = y ? y : targetBookmark.geoPoint.coordinates[1];
  return await AppDataSource.manager.save(targetBookmark);
};

export const remove = async (userId: number, id: number) => {
  const bookmarkTable = AppDataSource.getRepository(Bookmark);
  const bookmark = await bookmarkTable.findOne({
    relations: { user: true },
    where: {
      id: id,
      user: {
        id: userId,
      },
    },
  });
  if (!bookmark) {
    throw Error('bookmark.remove에서 없는 북마크를 지우려고 했습니다.');
  }
  return await bookmarkTable.softDelete(bookmark.id);
};
