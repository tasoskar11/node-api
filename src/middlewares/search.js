const express = require('express')
const applicationMiddleware = new express.Router()
const { getImdb, getMovie, getTrailer, retrieveKeyFromTrailerResponse } = require('../utils')


applicationMiddleware.get('/pc-se/film/:title', (req, res) => {
	getImdb(req.params.title)
		.then(imdb => getMovie(imdb))
		.then(movie => getTrailer(movie))
		.then((trailer) => {
			const youtubeKey = retrieveKeyFromTrailerResponse(trailer)
			res.header('Cache-Control', 'public, max-age=3600')
			res.set('Content-Type', 'application/json')
			res.send({ title: `https://www.youtube.com/watch?v=${youtubeKey}` })
		})
		.catch((err) => {
			console.log('Trailer API error: ', err.message)
			res.header('Cache-Control', 'public, max-age=0')
			res.status(err.message.status || 500).end()
		})
})


module.exports = applicationMiddleware