export default {
  logDir: 'logs', // 해당 디렉토리 하위에 로그 파일 저장
  timestampFormat: 'YYYY-MM-DD HH:mm:ss', // 아래 info.timestamp 변수에서 사용됨
  // 로그 파일에 쓰여질 로그 형식
  logFormater: info =>
    `${info.timestamp} ${info.level}: ${info.message} ${info.stack || ''}`,
  datePattern: 'YYYY-MM-DD', // 아래 %DATE% 변수에서 사용될 형식
  filename: '%DATE%.log', // 로그 파일 이름
  maxFiles: 2, // 로그 파일 저장 일치
  zippedArchive: true, // 전날 만든 파일을 zip으로 압축할지 여부
};
