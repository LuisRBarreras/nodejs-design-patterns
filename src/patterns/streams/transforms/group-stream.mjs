import { Transform } from 'stream'

export default class GroupStream extends Transform {
  constructor (size, options = {}) {
    options.objectMode = true
    super(options)
    this.size = size
    this.accumulator = []
  }

  _transform (record, enc, cb) {
    this.accumulator.push(record)
    if (this.accumulator.length >= this.size) {
      this.push(this.accumulator)
      this.accumulator = []
    }
    cb()
  }

  _flush (cb) {
    if (this.accumulator.length > 0) {
      this.push(this.accumulator)
    }
    cb()
  }
}
