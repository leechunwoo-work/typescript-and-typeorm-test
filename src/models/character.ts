import { AppDataSource } from '../data-source';
import { User, Character, User_Character } from '../entities';

// 대표 캐릭터 선택
export const select = async (userId: number, characterId: number) => {
  const user = await AppDataSource.getRepository(User).findOneBy({ id: userId });
  const character = await AppDataSource.getRepository(Character).findOneBy({ id: characterId });

  if (!user || !character) return;

  const UserCharacter = new User_Character();
  UserCharacter.user = user;
  UserCharacter.character = character;

  const result = await AppDataSource.manager.save(UserCharacter);

  return result;
};

// 대표 캐릭터 변경
export const change = async (userId: number, characterId: number) => {
  const user = await AppDataSource.getRepository(User).findOneBy({ id: userId });
  const character = await AppDataSource.getRepository(Character).findOneBy({ id: characterId });

  if (!user || !character) return;

  const UserCharacter = new User_Character();
  UserCharacter.user = user;
  UserCharacter.character = character;

  const result = await AppDataSource.manager.save(UserCharacter);

  return result;
};

// 대표 캐릭터 조회
export const find = async (userId: number) => {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOne({
    relations: {
      user_characters: true,
    },
    where: {
      id: userId,
      user_characters: {
        isRepresent: false,
      },
    },
    select: {
      id: true,
      email: true,
      nickname: true,
      newNotificationCount: true,
      isChallengeNotificationEnabled: true,
      isUltrafineDustNotificationEnabled: true,
      user_characters: {
        createdAt: true,
        experience: true,
        isRepresent: true,
        user: {
          id: false,
        },
        character: {
          id: true,
          name: true,
          type: true,
          levelMaxExperience: true,
        },
      },
    },
  });

  if (!user) return;

  return user;
};

// 생성
export const create = async (type: number, name: string, levelMaxExperience: number[]) => {
  const character = new Character();

  character.type = type;
  character.name = name;
  character.levelMaxExperience = levelMaxExperience;

  const result = await AppDataSource.manager.save(character);

  return result;
};
