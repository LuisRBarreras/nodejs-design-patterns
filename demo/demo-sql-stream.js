import { Readable, pipeline } from 'stream'
import SequelizeFactory from '../src/sequelize-factory.js'
import InsertDBStream from '../src/patterns/streams/transforms/insert-db-streams.js'
import GroupStream from '../src/patterns/streams/transforms/group-stream.js'
import { loggerStreamV2, stringifyDataFieldStream } from '../src/patterns/streams/transforms/helpers.js'

async function main () {
  const sequelize = await SequelizeFactory.create()

  try {
    const records = [
      { data: { name: 'john doe', accountNumber: '123481234' } },
      { data: { name: 'john smith', accountNumber: '34579344' } },
      { data: { name: 'will doe', accountNumber: '123451972' } },
      { data: { name: 'black doe', accountNumber: '909876543' } },
      { data: { name: 'black doe_1', accountNumber: '909876543_1' } },
      { data: { name: 'black doe_2', accountNumber: '909876543_2' } },
      { data: { name: 'black doe_3', accountNumber: '909876543_3' } }
    ]

    const recordStream = Readable.from(records)
    const groupByFiveStream = new GroupStream(5)
    const insertDBStream = new InsertDBStream(sequelize, 'accounts')

    //  Pipe between streams forwarding errors and properly cleaning up
    await pipeline(
      recordStream,
      stringifyDataFieldStream,
      groupByFiveStream,
      insertDBStream,
      loggerStreamV2,
      (error) => {
        console.log('finished')
        if (error) {
          console.error(error)
          process.exit(1)
        }
      })

    return 'successful'
  } catch (error) {
    console.error(error)
    throw error
  }
}

main()
