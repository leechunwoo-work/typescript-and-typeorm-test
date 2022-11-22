import { User } from '../entities';
import { AppDataSource } from '../migrations/data-source';

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
  user.password = password;
  user.nickname = nickname;
  user.notificationToken = notificationToken;
  user.oAuthUID = oAuthUID;
  user.authenticationStatus = authenticationStatus;
  user.authenticationType = authenticationType;
  user.authenticationLevel = authenticationLevel;
  user.newNotificationCount = newNotificationCount;
  user.isChallengeNotificationEnabled = isChallengeNotificationEnabled;
  user.isUltrafineDustNotificationEnabled = isUltrafineDustNotificationEnabled;
  await AppDataSource.manager.save(user);
};
