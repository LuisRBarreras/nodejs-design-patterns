
import { Transform } from 'stream'

export default class InsertDBStream extends Transform {
  constructor (sequelize, table, options = {}) {
    options.objectMode = true // To handle objects instead of binary data
    super(options)

    this.sequelize = sequelize
    this.table = table
  }

  _transform (records, enc, callback) {
    if (!Array.isArray(records)) {
      throw new Error('Record should be an array')
    }

    this.sequelize.queryInterface.bulkInsert(this.table, records)
      .then(result => {
        console.log('_transform', { result })
        this.push(records.map(item => {
          return {
            ...item,
            meta: { savedDb: true }
          }
        }))

        // Necessary to invoke the callback() to
        // indicate that the current record has been successfully processed
        // and that the stream is ready to receive another record
        callback()
      }).catch(error => {
        console.error(error)
        throw error
      })
  }
}
