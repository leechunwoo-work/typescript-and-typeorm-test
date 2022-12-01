import { Controller, VerifyController } from '../interfaces';
import { user } from '../models';
import httpError, { fixAjvError } from '../errors';
import logger, { jwt } from '../utils';
import Ajv from 'ajv';
const ajv = new Ajv({ useDefaults: false });

export const duplicateCheckBy: Controller = async (req, res, next) => {
    try {
        const requestSchema = {
            type: 'object',
            properties: {
                email: { type: 'string' },
                nickname: { type: 'string' },
            },
        };
        const isValid = ajv.validate(requestSchema, req.query);

        if (!isValid) {
            return next(fixAjvError(ajv.errors!));
        }

        if (!req.query.nickname && !req.query.email) {
            return next(httpError.noRequiredArguments);
        }

        const key = req.query.nickname ? 'nickname' : 'email';
        return res.status(200).json({
            message: '중복 확인을 완료 했습니다.',
            data: await user.duplicateCheckBy({ [key]: req.query[key]?.toString() }),
        });
    } catch (error) {
        logger.error(error);
        return next(httpError.undefined);
    }
};

export const signUp: Controller = async (req, res, next) => {
    try {
        const requestSchema = {
            type: 'object',
            required: [
                'email',
                'password',
                'nickname',
                'authenticationStatus',
                'isChallengeNotificationEnabled',
                'isUltrafineDustNotificationEnabled',
            ],
            properties: {
                email: {
                    type: 'string',
                },
                nickname: { type: 'string' },
                password: { type: 'string' },
                pushToken: { type: 'string' },
                isChallengeNotificationEnabled: { type: 'boolean' },
                isUltrafineDustNotificationEnabled: { type: 'boolean' },
            },
        };
        const isValid = ajv.validate(requestSchema, req.body);

        if (!isValid) {
            return next(fixAjvError(ajv.errors!));
        }

        if (await user.duplicateCheckBy({ email: req.body.email })) {
            return next(httpError.duplicateEmail);
        }

        if (await user.duplicateCheckBy({ nickname: req.body.nickname })) {
            return next(httpError.duplicateNickname);
        }

        const newUserInfo = await user.signUp(req.body);

        delete newUserInfo!.password;

        return res.status(200).json({
            message: '회원가입에 성공했습니다.',
            data: {
                accessToken: jwt.generateAccessToken(newUserInfo),
                refreshToken: jwt.generateRefreshToken(newUserInfo),
            },
        });
    } catch (error) {
        logger.error(error);
        return next(httpError.undefined);
    }
};

export const signIn: VerifyController = async (req, res, next) => {
    try {
        const requestSchema = {
            type: 'object',
            required: ['email', 'password'],
            properties: {
                email: { type: 'string' },
                password: { type: 'string' },
            },
        };
        const isValid = ajv.validate(requestSchema, req.body);

        if (!isValid) {
            return next(fixAjvError(ajv.errors!));
        }

        const userInfo = await user.get(req.body.email, req.body.password);
        if (!userInfo) {
            return next(httpError.invalidSignInfo);
        }

        delete userInfo!.password;

        return res.status(200).json({
            message: '로그인에 성공했습니다.',
            data: {
                accessToken: jwt.generateAccessToken(userInfo),
                refreshToken: jwt.generateRefreshToken(userInfo),
            },
        });
    } catch (error) {
        logger.error(error);
        return next(httpError.undefined);
    }
};

export const withdrawal: VerifyController = async (req, res, next) => {
    try {
        if (!(await user.withdrawal(req.token!.data.id))) {
            throw Error('회원 탈퇴를 실패했습니다.');
        }
        return res.status(200).json({
            message: '회원 탈퇴를 성공했습니다.',
            data: null,
        });
    } catch (error) {
        logger.error(error);
        return next(httpError.undefined);
    }
};

export const update: VerifyController = async (req, res, next) => {
    try {
        const requestSchema = {
            type: 'object',
            properties: {
                nickname: { type: 'string' },
                password: { type: 'string' },
                isChallengeNotificationEnabled: { type: 'boolean' },
                isUltrafineDustNotificationEnabled: { type: 'boolean' },
            },
        };
        const isValid = ajv.validate(requestSchema, req.body);

        if (!isValid) {
            return next(fixAjvError(ajv.errors!));
        }
        const updatedUserData = await user.update(req.token!.data.id, req.body);
        delete updatedUserData?.password;
        res.status(201).json({
            message: '회원 정보 수정에 성공했습니다.',
            data: updatedUserData,
        });
    } catch (error) {
        logger.error(error);
        return next(httpError.undefined);
    }
};

// 마이페이지 정보 조회
export const getMyPageData: VerifyController = async (req, res, next) => {
    try {
        const userId = req.token!.data.id;

        const characterInfo = await user.getMyPageData(userId);

        return res.status(200).send({
            message: '',
            data: characterInfo,
        });
    } catch (error) {
        logger.error(error);
        return next(httpError.undefined);
    }
};
