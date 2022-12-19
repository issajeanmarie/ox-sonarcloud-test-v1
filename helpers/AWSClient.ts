/* eslint-disable no-console */
import AWS from "aws-sdk";

/**
 * This function handles all AWS clients services,
 * for now it handles s3 which handles upload files only
 * but it can be used in the future if comes something in need
 * @author Issa Jean Marie <jeanmarieissa@gmail.com>
 * @since Sept 2022
 */

const { NEXT_PUBLIC_AWS_BUCKET_ACCESS_ID } = process.env;
const { NEXT_PUBLIC_AWS_BUCKET_ACCESS_KEY } = process.env;
const { NEXT_PUBLIC_AWS_BUCKET_NAME } = process.env;
const { NEXT_PUBLIC_AWS_BUCKET_REGION } = process.env;
// const { NEXT_PUBLIC_AWS_BUCKET_DIR_NAME } = process.env;

const S3_BUCKET = NEXT_PUBLIC_AWS_BUCKET_NAME;
const REGION = NEXT_PUBLIC_AWS_BUCKET_REGION;

AWS.config.update({
  accessKeyId: NEXT_PUBLIC_AWS_BUCKET_ACCESS_ID,
  secretAccessKey: NEXT_PUBLIC_AWS_BUCKET_ACCESS_KEY
});

const myBucket = new AWS.S3({
  params: { Bucket: S3_BUCKET },
  region: REGION,
  signatureVersion: "v4"
});

// ALL OF S3 CLIENTS
// We can use this s3Clients in the future to add more methods to this single s3 exported function
export const s3Clients = {
  s3UploadFile: (
    file: File,
    setUploadLoading: any,
    setUploadSuccess: any,
    setUploadFailure: any,
    setUploadedPicInfo: any
  ) => {
    const params = {
      ACL: "public-read",
      Body: file || "",
      Bucket: S3_BUCKET || "",
      Key: file.name,
      ContentType: file.type || ""
    };

    myBucket
      .putObject(params)
      .on("httpUploadProgress", (evt: any) => {
        console.log("Event: ", evt);
      })
      .send(async (err: any) => {
        setUploadLoading(false);
        if (err) {
          setUploadFailure(err);
          setUploadLoading(false);
        } else {
          const url = await myBucket.getSignedUrlPromise("putObject", params);
          if (url) {
            const urlParts = new URL(url);
            const { origin, pathname } = urlParts;
            const mediaUrl = origin + pathname;
            setUploadedPicInfo(mediaUrl);
            setUploadSuccess(true);
            setUploadLoading(false);
          }
        }
      });
  }
};
