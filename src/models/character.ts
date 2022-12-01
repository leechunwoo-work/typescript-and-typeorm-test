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
    const userCharacter = await AppDataSource.getRepository(User_Character).findOneBy({ userId, characterId });
    console.log(userCharacter);
    // const user = await AppDataSource.getRepository(User).findOneBy({ id: userId });
    // const character = await AppDataSource.getRepository(Character).findOneBy({ id: characterId });

    // if (!user || !character) return;

    // const NewUserCharacter = new User_Character();
    // NewUserCharacter.user = user;
    // NewUserCharacter.character = character;
    // NewUserCharacter.isRepresent = true;

    // const result = await AppDataSource.manager.save(NewUserCharacter);

    // return result;
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
