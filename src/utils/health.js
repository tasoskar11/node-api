

const config = require('../config')

const formatJSON = () => {
  try {
    return {
      health: {
        status: 'UP',
        environment: process.env.NODE_ENV,
        contentViaplayURL: config.contentViaplayURL
      }
    }
  } catch (x) {
    console.warn(x)
  }
}

module.exports = (req, res) => {
  res.set('Content-Type', 'application/json')
  res.send(formatJSON())
}
