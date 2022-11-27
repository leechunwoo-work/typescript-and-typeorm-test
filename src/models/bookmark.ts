import { Bookmark } from '../entities';
import { User } from '../entities';
import { AppDataSource } from '../data-source';

export const getList = async (userId: number) => {
  const userTable = AppDataSource.manager.getRepository(User);
  return await userTable.findOneBy({ id: userId });
};

export const create = async (title: string, x: number, y: number) => {
  const bookmark = new Bookmark();
  bookmark.title = title;
  bookmark.geoPoint = {
    type: 'Point',
    coordinates: [y, x],
  };
  return await AppDataSource.manager.save(bookmark);
};

export const update = async (id: number, newBookmarkInfo) => {
  const userBookmark = AppDataSource.manager.getRepository(Bookmark);
  const targetBookmark = await userBookmark.findOneBy({ id });
  if (!targetBookmark) {
    throw Error('북마크 수정에 실패 했습니다.');
  }
  for (const key in newBookmarkInfo) {
    if (!(key in targetBookmark)) {
      throw Error(`bookmark.update에서 Bookmark 스키마에 없는 컬럼 "${key}"(을)를 바꾸려고 했습니다.`);
    }
    targetBookmark[key] = newBookmarkInfo[key];
  }
  return await AppDataSource.manager.save(targetBookmark);
};

export const remove = async (id: number) => {
  return await update(id, { deletedAt: new Date() });
};
