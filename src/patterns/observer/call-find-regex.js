import { FindRegex } from './find-regex.js'

const findRegexInstance = new FindRegex(/hello \w+/g)

findRegexInstance
  .addFile('samples/fileA.txt')
  .find()
  .on('found', (file, match) => console.log(`Matched "${match}" in file "${file}"`))
  .on('error', err => console.error(`Error emitted ${err.message}`))
