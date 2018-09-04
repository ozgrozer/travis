const path = require('path')
const express = require('express')

const defaults = require(path.join(__dirname, 'defaults'))
const routeIndex = require(path.join(__dirname, 'route', 'routeIndex'))

const app = express()
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, '..', 'frontend', 'html'))
app.use(express.static(path.join(__dirname, '..', 'public')))
app.use(express.json())
app.use(routeIndex)
app.listen(defaults.port, () => {
  console.log(`${defaults.name}: http://localhost:${defaults.port}`)
})
