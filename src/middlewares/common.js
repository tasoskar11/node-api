const express = require('express')
const common = new express.Router()

const compression = require('compression')
const bodyParser = require('body-parser')
const promBundle = require('express-prom-bundle')

const metricsMiddleware = promBundle({})
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('../config/swagger.json')



common.use(compression())
common.use(bodyParser.urlencoded({ extended: false }))
common.use(bodyParser.json())

// handle CORS issue
common.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*')
	res.header('Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept')
	next()
})

common.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

// health and monitoring middlewares
common.use('/health', require('../utils/health'))
common.use(metricsMiddleware)

module.exports = common