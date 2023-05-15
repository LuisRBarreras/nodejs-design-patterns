
import { Transform } from 'stream'

export class FilterByCountry extends Transform {
  constructor (country, options = {}) {
    options.objectMode = true
    super(options)
    this.country = country
  }

  _transform (record, enc, cb) {
    if (record.country === this.country) {
      this.push(record)
    }

    // Regardless of whether the record matches or not, we need to invoke the cb() to
    // indicate that the current record has been successfully processed and that the stream is ready
    // to receive another record
    cb()
  }
}
