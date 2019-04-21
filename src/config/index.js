if (process.env.NODE_ENV === 'prod') {
	module.exports = require('./config-prod.js')
} else if (process.env.NODE_ENV === 'dev') {
	module.exports = require('./config-dev.js')
} else if (process.env.NODE_ENV === 'test') {
	module.exports = require('./config-test.js')
} else {
	module.exports = require('./config-local.js')
}
