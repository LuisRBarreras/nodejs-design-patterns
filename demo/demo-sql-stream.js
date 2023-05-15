import SequelizeFactory from '../src/sequelize-factory.js'
import { QueryTypes } from 'sequelize'

async function main () {
  const sequelize = await SequelizeFactory.create()

  try {
    const accountData = { name: 'john doe', accountNumber: '123481234' }
    const result = await sequelize.query('INSERT INTO accounts (data) VALUES(:data)', {
      replacements: { data: JSON.stringify(accountData) },
      type: QueryTypes.INSERT
    })
    return result
  } catch (error) {
    console.error(error)
    throw error
  }
}

main()
