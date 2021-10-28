import AWS from "aws-sdk";

AWS.config.update({
  credentials: {
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET,
  },
});

export const uploadToS3 = async ({ file, loggedInUser, folderName }) => {
  const { filename, createReadStream } = await file;
  const readStream = createReadStream();
  const objectName = `${folderName}/${
    loggedInUser.id
  }-${Date.now()}-${filename}`;

  //AWS_S3 업로드//
  const { Location } = await new AWS.S3()
    .upload({
      Bucket: "hyesng-instaclone-bucket", //버켓 이름
      Key: objectName, //파일 명
      ACL: "public-read", //공개 or 비공개
      Body: readStream, // 스트림 or ~~
    })
    .promise();
  return Location;

  // const { filename, createReadStream } = await file;
  // const newFilename = `${loggedInUser.id}-${Date.now()}-${filename}`;
  // const readStream = createReadStream();
  // const writeStream = createWriteStream(
  //   process.cwd() + "/uploads/" + newFilename
  // );
  // readStream.pipe(writeStream);
  // return `http://localhost:4000/static/${newFilename}`;
};
