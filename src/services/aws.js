const AWS = require('aws-sdk')
const { IAM_ACCESS, IAM_SECRET, BUCKET_NAME } = require('@/config.js')

class S3 {
  constructor(access, secret, bucketName) {
    this.bucket = bucketName

    this.params = {
      Bucket: this.bucket,
      Key: Date.now().toString(), 
    };

    this.s3 = new AWS.S3({
      accessKeyId: IAM_ACCESS,
      secretAccessKey: IAM_SECRET,
    });
  }

  upload(files) {
    files.forEach(file => {
      console.log(file)
      const base64data = Buffer.from(file, "base64")
      
      return
      this.s3.upload({ ...this.params, Body: base64data}, function (err, data) {
        if (err) {
          throw err;
        }
        console.log(`File uploaded successfully. ${data.Location}`);
      });
    })
  }
}

const s3 = new S3(IAM_ACCESS, IAM_SECRET, BUCKET_NAME)

module.exports = s3