const path = require('path')
const fs = require('fs')

const app = fs.realpathSync(process.cwd())

function resolveAppPath(pathToResolve) {
  return path.resolve(app, pathToResolve)
}

module.exports = {
  app,
  src: resolveAppPath('src'),
  build: resolveAppPath('dist')
}
