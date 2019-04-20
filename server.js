const express = require('express')
const http = require('http')
const compression = require('compression')
const bodyParser = require('body-parser')
const promBundle = require('express-prom-bundle')

const metricsMiddleware = promBundle({})
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./src/config/swagger.json')

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

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// health and monitoring middlewares
app.use('/health', require('./src/utils/health'))
app.use(metricsMiddleware)

// application middleware
app.get('/pc-se/film/:title', (req, res) => {
  getImdb(req.params.title)
    .then(imdb => getMovie(imdb._embedded['viaplay:blocks'][0]._embedded['viaplay:product'].content.imdb.id))
    .then(movie => getTrailer(movie.movie_results[0].id))
    .then((trailer) => {
      // console.log('trailer', trailer)
      res.header('Cache-Control', 'public, max-age=3600')
      res.set('Content-Type', 'application/json')
      res.send({ title: `https://www.youtube.com/watch?v=${trailer.results[0].key}` })
    })
    .catch((err) => {
      console.log('Trailer API error: ', err.message)
      res.header('Cache-Control', 'public, max-age=0')
      res.status(err.message.status || 500).end()
    })
})


const port = process.argv[2] || process.env.PORT || 5001
const server = http.createServer(app);
server.listen(port, () =>
  console.log(`Running at http://localhost:${port}...`)
);