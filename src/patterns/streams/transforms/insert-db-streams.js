
import { QueryTypes } from 'sequelize'
import { Transform } from 'stream'

export default class InsertDBStream extends Transform {
  constructor (sequelize, table, options = {}) {
    options.objectMode = true // To handle objects instead of binary data
    super(options)

    this.sequelize = sequelize
    this.table = table
  }

  _transform (records, enc, cb) {
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

        cb()
      }).catch(error => {
        console.error(error)
        throw error
      })
  }
}
