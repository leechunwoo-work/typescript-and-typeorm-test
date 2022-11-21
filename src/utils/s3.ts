import AWS from 'aws-sdk';
import fs from 'fs';

const s3 = new AWS.S3({
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_KEY,
  region: process.env.S3_REGION,
});

// @ts-check
module.exports = {
  /**
   * 파일을 s3에 업로드한다.
   * @param {string} projectFilePath - 프로젝트 루트에서 파일 이름까지 경로 ex) /log/file.txt or /utils/file.txt
   * @param {string} uploadPath - 업로드 위치 https://s3base.url.com/{uploadPath}
   * @return {Promise<void>}
   */
  upload: async (projectFilePath, uploadPath) => {
    // 제일 앞에 '/'를 삭제 하고 프로젝트 경로를 이어붙인다.
    const absoluteFilePath = `${process.env.PWD}/${projectFilePath.replace(/^\//, '')}`;
    // 파일 이름을 가져온다.
    const fileName = projectFilePath.match(/[^/]+$/)[0];
    const param = {
      Bucket: process.env.S3_BUCKET as string,
      Key: `${uploadPath}/${fileName}`,
      ACL: 'public-read',
      Body: fs.createReadStream(absoluteFilePath),
    };
    s3.upload(param, err => {
      if (err) {
        throw err;
      }
    });
  },
};
