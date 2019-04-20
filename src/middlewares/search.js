const express = require('express')
applicationMiddleware = new express.Router()
const { getImdb, getMovie, getTrailer } = require('../utils')


applicationMiddleware.get('/pc-se/film/:title', (req, res) => {
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


module.exports = applicationMiddleware