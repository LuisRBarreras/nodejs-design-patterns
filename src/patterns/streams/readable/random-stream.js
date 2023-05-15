import { Readable } from 'stream'
import Chance from 'chance'

const chance = new Chance()
export class RandomStream extends Readable {
  constructor (options) {
    super(options)
    this.emittedBytes = 0
  }

  _read (size) {
    const chunk = chance.string({ length: 10000 })
    // On push, return false means that the internal buffer of the receiving stream has reach
    // the hightWaterMark limit and we should stop adding more data to it.
    // This called backpressure
    const result = this.push(chunk, 'utf8')
    if (result === false) {
      throw new Error('hightWaterMark limit has been reached')
    }

    console.log(`Check result of push: ${result}`)
    this.emittedBytes += chunk.length
    if (chance.bool({ likelihood: 3 })) {
      this.push(null)
    }
  }
}

const randomStream = new RandomStream()
randomStream.on('data', (chunk) => {
  console.log(`Chunk received (${chunk.length} bytes): ${chunk.toString()}`)
})
  .on('end', () => {
    console.log(`Produced ${randomStream.emittedBytes} bytes of random data`)
  })
