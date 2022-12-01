import { sign, verify, Secret } from 'jsonwebtoken';
const JWT_KEY: Secret = process.env.JWT_KEY || '';

export const generateAccessToken = data => {
    // accessToken 생성
    return sign({ data }, JWT_KEY);
};

export const generateRefreshToken = data => {
    // refreshToken 생성
    return sign({ data }, JWT_KEY);
};

export const checkRefreshToken = refreshToken => {
    // refreshToken 인증
    try {
        return verify(refreshToken, JWT_KEY);
    } catch {
        return null;
    }
};
