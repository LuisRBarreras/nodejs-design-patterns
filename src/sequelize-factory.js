
import Sequelize from 'sequelize'
import config from '../config/config.js'
export default class SequelizeFactory {
  static async create () {
    const { database, username, password, host, port, dialect } = config.development
    const sequelize = new Sequelize(database, username, password, {
      host,
      port,
      dialect
    })

    try {
      await sequelize.authenticate()
      console.log('Connection has been established successfully.')
    } catch (error) {
      console.log('Unable to connect to the database:', error)
    }

    return sequelize
  }
}
