import { Transform } from 'stream'

export default class GroupStream extends Transform {
  constructor (size, options = {}) {
    options.objectMode = true
    super(options)
    this.size = size
    this.accumulator = []
  }

  _transform (record, enc, callback) {
    this.accumulator.push(record)

    if (this.accumulator.length >= this.size) {
      this.push(this.accumulator)
      this.accumulator = []
    }

    // Necessary to invoke the callback() to
    // indicate that the current record has been successfully processed
    // and that the stream is ready to receive another record
    callback()
  }

  _flush (callback) {
    if (this.accumulator.length > 0) {
      this.push(this.accumulator)
      this.accumulator = []
    }
    callback()
  }
}
