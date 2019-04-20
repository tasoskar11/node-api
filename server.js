const express = require('express')
const http = require('http')
const compression = require('compression')
const bodyParser = require('body-parser')
const promBundle = require('express-prom-bundle')

const metricsMiddleware = promBundle({})
const { getImdb, getMovie, getTrailer } = require('./src/utils')

/** COMMON middlewares */
const app = express()
app.use(compression())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// handle CORS issue
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

// health and monitoring middlewares
app.use('/health', require('./src/utils/health'))
app.use(metricsMiddleware)


const port = process.argv[2] || process.env.PORT || 5001
const server = http.createServer(app);
server.listen(port, () =>
  console.log(`Running at http://localhost:${port}...`)
);