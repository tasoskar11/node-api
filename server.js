const express = require('express')
const http = require('http')
const compression = require('compression')
//const { applyMiddleware } = require('./src/utils')

const router = express()

//applyMiddleware(middleware, router);

const port = process.argv[2] || process.env.PORT || 5001
const server = http.createServer(router);
server.listen(port, () =>
  console.log(`Running at http://localhost:${port}...`)
);