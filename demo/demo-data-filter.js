
import { createReadStream } from 'fs'
import { parse } from 'csv-parse'
import { FilterByCountry } from '../src/patterns/streams/transforms/filter-by-country.js'
import { SumProfit } from '../src/patterns/streams/transforms/sum-profit.js'
import { Transform } from 'stream'

const csvParser = parse({ columns: true, delimiter: ',', encoding: 'utf-8' })

const addTaxStream = new Transform({
  objectMode: true,
  transform (data, enc, cb) {
    const tax = data.profit * 0.15
    this.push({ ...data, tax })
    cb()
  }

})

createReadStream('/Users/luisbarreras/code/courses/nodejs-design-patterns/samples/fortune-500.csv')
  .pipe(csvParser)
  .pipe(new FilterByCountry('Italy'))
  .pipe(addTaxStream)
  .pipe(new SumProfit())

  .on('data', (chunk) => {
    console.log(chunk)
  })
