import { User } from '../entities';
import crypto from 'crypto-js';
import { AppDataSource } from '../data-source';
const PASSWORD_KEY = process.env.PASSWORD_KEY || '';

export const duplicateCheckBy = async ({ nickname, email }: { nickname?: string; email?: string }) => {
  if (!nickname && !email) {
    throw Error('인자가 없습니다.');
  }
  const userTable = AppDataSource.manager.getRepository(User);
  const key = nickname ? { nickname } : { email };
  return await userTable.findOneBy(key);
};

export const signUp = async ({
  email = null,
  password = null,
  nickname = null,
  notificationToken = null,
  oAuthUID = null,
  authenticationStatus = 0,
  authenticationType = 0,
  authenticationLevel = 0,
  newNotificationCount = 0,
  isChallengeNotificationEnabled = true,
  isUltrafineDustNotificationEnabled = true,
}: {
  email: string | null;
  password: string | null;
  nickname: string | null;
  notificationToken: string | null;
  oAuthUID: string | null;
  authenticationStatus: number;
  authenticationType: number;
  authenticationLevel: number;
  newNotificationCount: number;
  isChallengeNotificationEnabled: boolean;
  isUltrafineDustNotificationEnabled: boolean;
}) => {
  const user = new User();
  user.email = email;
  user.password = password && crypto.HmacSHA256(password, PASSWORD_KEY).toString();
  user.nickname = nickname;
  user.notificationToken = notificationToken;
  user.oAuthUID = oAuthUID;
  user.authenticationStatus = authenticationStatus;
  user.authenticationType = authenticationType;
  user.authenticationLevel = authenticationLevel;
  user.newNotificationCount = newNotificationCount;
  user.isChallengeNotificationEnabled = isChallengeNotificationEnabled;
  user.isUltrafineDustNotificationEnabled = isUltrafineDustNotificationEnabled;
  return await AppDataSource.manager.save(user);
};

export const get = async (email: string, password: string) => {
  if (!email || !password) {
    throw Error('user.get에서 인자가 없는 것이 있습니다.');
  }
  const UserTable = AppDataSource.manager.getRepository(User);
  return await UserTable.findOneBy({
    email,
    password: crypto.HmacSHA256(password, PASSWORD_KEY).toString(),
  });
};

export const isInformationCorrect = async (email: string, password: string) => {
  if (!email || !password) {
    throw Error('user.isInformationCorrect에서 인자가 없는 것이 있습니다.');
  }
  return !!(await get(email, password));
};
