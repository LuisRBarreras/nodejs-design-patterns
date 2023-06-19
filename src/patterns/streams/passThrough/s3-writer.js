import { PassThrough } from 'stream'
import AWS from 'aws-sdk'

export default class S3Writer {
  constructor (bucket, key) {
    this.bucket = bucket
    this.key = key
    this.S3 = new AWS.S3()
  }

  _upload (Bucket, Key, Body) {
    return this.S3.upload({ Bucket, Key, Body }).promise()
  }

  createUploadStream () {
    const connector = new PassThrough()
    this._upload(this.bucket, this.key, connector)
    return connector
  }
}
