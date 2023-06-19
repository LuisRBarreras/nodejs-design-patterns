
import { PassThrough, Transform } from 'stream'

export const stringifyDataFieldStream = new Transform({
  objectMode: true,
  transform (item, encoding, callback) {
    this.push({ ...item, data: JSON.stringify(item.data) })
    callback()
  }
})

export const loggerStream = new Transform({
  objectMode: true,
  transform (item, encoding, callback) {
    console.log({ item })
    this.push(item)
    callback()
  }
})

export const loggerStreamV2 = new PassThrough({ objectMode: true })
loggerStreamV2.on('data', (item) => {
  console.log({ item })
})
