import config from '../configs/log';
import winston from 'winston';
import winstonDaily from 'winston-daily-rotate-file';

const { combine, timestamp, printf, errors, prettyPrint, colorize } = winston.format;

const logFormater = printf(config.logFormater);
const logger = winston.createLogger({
    format: combine(
        errors({ stack: true }),
        colorize(),
        timestamp({ format: config.timestampFormat }),
        prettyPrint(),
        logFormater
    ),
    transports: [
        new winstonDaily({
            datePattern: config.datePattern,
            dirname: config.logDir,
            filename: config.filename,
            maxFiles: config.maxFiles,
            zippedArchive: config.zippedArchive,
        }),
    ],
});

logger.add(
    new winston.transports.Console({
        format: combine(
            // colorize(),  // 색깔 넣어서 출력
            // simple(),  // `${info.level}: ${info.message} JSON.stringify({ ...rest })` 포맷으로 출력
            logFormater
        ),
    })
);

export default logger;
