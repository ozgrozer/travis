const os = require('os')
const path = require('path')

const defaults = {
  name: 'travis',
  port: 1126,
  exportPath: path.join(os.homedir(), 'Desktop', 'data.json')
}

module.exports = defaults
