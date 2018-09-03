const path = require('path')
const defaults = require(path.join(__dirname, '..', 'defaults'))

const home = (req, res) => {
  res.render('index', { defaults })
}

module.exports = home
