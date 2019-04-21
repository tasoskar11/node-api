'use strict'

const config = require('../config/index')
const fetch = require('../fetch')
const dotenv = require('dotenv')

dotenv.config()
const key = process.env.API_KEY

const retrieveImdbIdFromViaplayResponse = (imdb) => {
  if (imdb && imdb._embedded
    && imdb._embedded['viaplay:blocks']
    && imdb._embedded['viaplay:blocks'][0]
    && imdb._embedded['viaplay:blocks'][0]._embedded
    && imdb._embedded['viaplay:blocks'][0]._embedded['viaplay:product']
    && imdb._embedded['viaplay:blocks'][0]._embedded['viaplay:product'].content
    && imdb._embedded['viaplay:blocks'][0]._embedded['viaplay:product'].content.imdb
    && imdb._embedded['viaplay:blocks'][0]._embedded['viaplay:product'].content.imdb.id) { 
    return imdb._embedded['viaplay:blocks'][0]._embedded['viaplay:product'].content.imdb.id
  } else {
    const error = new Error()
    error.message = {
      status: 404,
      statusText: 'Could not find imdbId for given title',
    }
    throw error
  }
}
const retrieveMovieIdFromMovieDBResponse = (movie) => {
  if (movie && movie.movie_results
      && movie.movie_results[0]
      && movie.movie_results[0].id) { 
    return movie.movie_results[0].id
  } else {
    const error = new Error()
    error.message = {
      status: 404,
      statusText: 'Could not find movieId for given imdbId',
    }
    throw error
  }
}

const retrieveKeyFromTrailerResponse = (trailer) =>  {
  if (trailer && trailer.results
    && trailer.results[0]
    && trailer.results[0].key) { 
    return trailer.results[0].key
  } else {
    const error = new Error()
    error.message = {
      status: 404,
      statusText: 'Could not find youtubeId for given trailer',
    }
    throw error
  }
}
const getImdb = (title) => {
  // http://localhost:5000/trailer?title=para-knas-2017
  // https://content.viaplay.se/pc-se/film/para-knas-2017
  // https://api.themoviedb.org/3/find/tt6205766?api_key=API_KEY&language=en-US&external_source=imdb_id
  // https://api.themoviedb.org/3/movie/492867/videos?api_key=API_KEY
  const contentViaplayURL = `${config.contentViaplayURL}/${title}`

  return fetch(contentViaplayURL)
}

const getMovie = (imdb) => {
  const imdbId = retrieveImdbIdFromViaplayResponse(imdb)
  // http://localhost:5000/trailer?title=para-knas-2017
  // https://content.viaplay.se/pc-se/film/para-knas-2017
  // https://api.themoviedb.org/3/find/tt6205766?api_key=API_KEY&language=en-US&external_source=imdb_id
  // https://api.themoviedb.org/3/movie/492867/videos?api_key=API_KEY
  const apiTheMovieDbURL = `${config.apiTheMovieDb}/find/${imdbId}`
  // console.log('imdb_id getMovie',imdb_id)
  

  const movieParams = {
    api_key: key,
    language: 'en-US',
    external_source: 'imdb_id'
  }
  return fetch(apiTheMovieDbURL, movieParams)
}

const getTrailer = (movie) => {
  // http://localhost:5000/trailer?title=para-knas-2017
  // https://content.viaplay.se/pc-se/film/para-knas-2017
  // https://api.themoviedb.org/3/find/tt6205766?api_key=API_KEY&language=en-US&external_source=imdb_id
  // https://api.themoviedb.org/3/movie/492867/videos?api_key=API_KEY
  const movieId = retrieveMovieIdFromMovieDBResponse(movie)
  const url = `${config.apiTheMovieDb}/movie/${movieId}/videos`
  console.log('movieId getTrailer', movieId)
  const trailerParams = {
    api_key: key
  }
  return fetch(url, trailerParams)
}

module.exports = {
  getImdb, getMovie, getTrailer, retrieveKeyFromTrailerResponse
}
