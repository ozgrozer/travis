const os = require('os')
const path = require('path')

const defaults = {
  name: 'travis',
  port: 1126,
  downloadPath: path.join(os.homedir(), 'Desktop', 'data.json')
}

module.exports = defaults
