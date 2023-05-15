import { createServer } from 'http'
import { Chance } from 'chance'

const chance = new Chance()
const server = createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' })

  generateMore()
  function generateMore () {
    while (chance.bool({ likelihood: 95 })) {
      const randomChunk = chance.string({
        length: (16 * 1024) - 1
      })

      const shouldContinue = res.write(`${randomChunk}\n`)
      if (!shouldContinue) {
        console.log('back-pressure')
        return res.once('drain', generateMore)
      }
    }
    res.end('\n\n')
  }

  res.on('finish', () => console.log('All date sent'))
})

const port = 8090
server.listen(port, () => {
  console.log(`listening on http://localhost:${port}`)
})
