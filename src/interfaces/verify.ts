import { Request } from 'express';

interface UserVerifyData {
  id: number;
  createdAt: Date;
  deletedAt?: Date;
  email?: string;
  nickname?: string;
  notificationToken?: string;
  oAuthUID?: string;
  authenticationStatus: number;
  authenticationType: number;
  authenticationLevel: number;
  newNotificationCount: number;
  isChallengeNotificationEnabled: boolean;
  isUltrafineDustNotificationEnabled: boolean;
}

interface TokenData {
  data: UserVerifyData;
  iat: number;
  exp: number;
}

export interface VerifyRequest extends Request {
  token?: TokenData;
}
