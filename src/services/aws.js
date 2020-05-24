const aws = require('aws-sdk')
const { IAM_ACCESS, IAM_SECRET, BUCKET_NAME } = require('@/config.js')
const REGION = 'eu-central-1'

class AWS {
  constructor(access, secret, bucketName, region) {
    this.bucket = bucketName
    aws.config.update({
      accessKeyId: access,
      secretAccessKey: secret,
      region
    })

    this.params = {
      Bucket: this.bucket,
      Key: Date.now().toString(), 
    };

    this.s3 = new aws.S3();
  }
}

const awsInst = new AWS(IAM_ACCESS, IAM_SECRET, BUCKET_NAME, REGION)

module.exports = awsInst