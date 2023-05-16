
import { Transform } from 'stream'

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
