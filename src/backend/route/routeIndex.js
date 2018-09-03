const path = require('path')
const express = require('express')
const router = express.Router()

const home = require(path.join(__dirname, 'home'))
const download = require(path.join(__dirname, 'download'))

router.get('/', home)
router.post('/download', download)

module.exports = router
