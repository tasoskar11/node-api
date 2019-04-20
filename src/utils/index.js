'use strict'

const config = require('../config/index')
const fetch = require('../fetch')

const getImdb = (title) => {
  // http://localhost:5000/trailer?title=para-knas-2017
  // https://content.viaplay.se/pc-se/film/para-knas-2017
  // https://api.themoviedb.org/3/find/tt6205766?api_key=ddc5cfb794251973f585a5fd7768930e&language=en-US&external_source=imdb_id
  // https://api.themoviedb.org/3/movie/492867/videos?api_key=ddc5cfb794251973f585a5fd7768930e
  const contentViaplayURL = `${config.contentViaplayURL}/${title}`

  return fetch(contentViaplayURL)
}

const getMovie = (imdbId) => {
  // http://localhost:5000/trailer?title=para-knas-2017
  // https://content.viaplay.se/pc-se/film/para-knas-2017
  // https://api.themoviedb.org/3/find/tt6205766?api_key=ddc5cfb794251973f585a5fd7768930e&language=en-US&external_source=imdb_id
  // https://api.themoviedb.org/3/movie/492867/videos?api_key=ddc5cfb794251973f585a5fd7768930e
  const apiTheMovieDbURL = `${config.apiTheMovieDb}/find/${imdbId}`
  // console.log('imdb_id getMovie',imdb_id)
  const movieParams = {
    api_key: 'ddc5cfb794251973f585a5fd7768930e',
    language: 'en-US',
    external_source: 'imdb_id'
  }
  return fetch(apiTheMovieDbURL, movieParams)
}

const getTrailer = (movieId) => {
  // http://localhost:5000/trailer?title=para-knas-2017
  // https://content.viaplay.se/pc-se/film/para-knas-2017
  // https://api.themoviedb.org/3/find/tt6205766?api_key=ddc5cfb794251973f585a5fd7768930e&language=en-US&external_source=imdb_id
  // https://api.themoviedb.org/3/movie/492867/videos?api_key=ddc5cfb794251973f585a5fd7768930e
  const url = `${config.apiTheMovieDb}/movie/${movieId}/videos`
  // console.log('movie_id getTrailer', movie_id)
  const trailerParams = {
    api_key: 'ddc5cfb794251973f585a5fd7768930e'
  }
  return fetch(url, trailerParams)
}

module.exports = {
  getImdb, getMovie, getTrailer
}
