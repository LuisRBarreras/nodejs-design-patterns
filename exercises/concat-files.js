
const fs = require('fs')
const path = require('path')
async function concatFiles (...parameters) {
  const [cb, dest, ...srcFiles] = parameters.reverse()
  try {
    let stream = ''
    for (const filePath of srcFiles.reverse()) {
      const data = fs.readFileSync(filePath, 'utf8')
      stream += data
    }

    console.log(stream)
    return cb(null, stream)
  } catch (error) {
    return cb(error)
  }
}

if (require.main === module) {
  const cb = (...params) => console.log(params)
  const file = path.join(__dirname, '../samples', 'fileFoo.txt')
  console.log(file)
  concatFiles(
    path.join(__dirname, '..samples', 'fileFoo.txt'),
    path.join(__dirname, '..samples', 'fileBar.txt'),
    path.join(__dirname, '..samples', 'result.txt'),
    cb)
}
