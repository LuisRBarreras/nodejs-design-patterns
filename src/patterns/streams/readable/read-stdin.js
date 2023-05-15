
const MODE_EVENT = {
  NON_FLOWING: 'readable',
  FLOWING: 'data'
}

// process.stdin.on(MODE_EVENT.FLOWING, () => {
//   let chunk
//   console.log('New data available')
//   while ((chunk = process.stdin.read()) !== null) {
//     console.log(`Chunk read (${chunk.length} bytes): "${chunk.toString()}"`)
//   }
// }).on('end', () => console.log('End of stream'))

process.stdin.on(MODE_EVENT.FLOWING, (chunk) => {
  console.log('New data available')
  console.log(`Chunk read (${chunk.length} bytes): "${chunk.toString()}"`)
}).on('end', () => console.log('End of stream'))
