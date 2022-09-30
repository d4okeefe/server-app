const express = require('express')
var cors = require('cors')
const axios = require('axios')
const PORT = process.env.PORT || 3001
const app = express()
const router = (global.router = express.Router())
app.use('/wired', require('./wiredRoutes'))
app.use('/scientific-american', require('./sciAmRoutes'))
app.use('/new-yorker', require('./newYorkerRoutes'))
app.use('/washington-post', require('./wapoRoutes'))
app.use('/new-york-times', require('./nytRoutes'))
app.use('/espn', require('./espnRoutes'))
app.use(router)
app.use(cors())

app.use((req, res, next) => {
  res.status(404)
  res.type('txt').send('Not found')
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
})
