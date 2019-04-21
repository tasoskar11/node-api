const express = require('express')
const http = require('http')


const commonMiddleware = require('./src/middlewares/common')
const applicationMiddleware = require('./src/middlewares/search')

/** COMMON middlewares */
const app = express()
app.use(commonMiddleware)

// application middleware
app.use(applicationMiddleware)

const port = process.argv[2] || process.env.PORT || 5001
const server = http.createServer(app)


if(!module.parent) { // just start listening when you are not running under test.
  server.listen(port, () =>
    console.log(`Running at http://localhost:${port}...`)
  )
}

module.exports = server // exposed for testing