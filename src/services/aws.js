const aws = require('aws-sdk')
const { IAM_ACCESS, IAM_SECRET, BUCKET_NAME } = require('@/config.js')
const REGION = 'eu-central-1'

class AWS {
  constructor(access, secret, bucketName) {
    this.bucket = bucketName
    aws.config.update({
      accessKeyId: IAM_ACCESS,
      secretAccessKey: IAM_SECRET,
      region: REGION
    })

    this.params = {
      Bucket: this.bucket,
      Key: Date.now().toString(), 
    };

    this.s3 = new aws.S3();
  }

  // upload(files) {
  //   files.forEach(file => {
  //     console.log(file)
  //     const base64data = Buffer.from(file, "base64")
      
  //     return
  //     this.s3.upload({ ...this.params, Body: base64data}, function (err, data) {
  //       if (err) {
  //         throw err;
  //       }
  //       console.log(`File uploaded successfully. ${data.Location}`);
  //     });
  //   })
  // }
}

const awsInst = new AWS(IAM_ACCESS, IAM_SECRET, BUCKET_NAME)

module.exports = awsInst