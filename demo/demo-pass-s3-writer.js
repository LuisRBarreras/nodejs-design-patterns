import S3Writer from '../src/patterns/streams/passThrough/s3-writer.js'
async function main () {
  try {
    const bucket = 'demo-bucket-stream'
    const key = 'stream-file.txt'

    const s3Writer = new S3Writer(bucket, key)
    const upload = s3Writer.createUploadStream()

    const result = await upload.write('hello world')
    console.log({ result })

    const final = await upload.end()
    console.log({ final })
  } catch (ex) {
    console.error(ex)
    throw ex
  }
}

main()
