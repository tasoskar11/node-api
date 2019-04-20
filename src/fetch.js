
const fetch = require('node-fetch')
const { stringify } = require('querystring')

module.exports = (url, params) => {
  if (params) {
    url = `${url}?${stringify(params)}`
  }
  // uncomment here to inspect the actual url
  console.log(`Fetching url: ${url}`)
  return fetch(url, { timeout: 5000 })
    .then((res) => {
      if (!res.ok) {
        const error = new Error()
        error.message = {
          status: res.status,
          statusText: res.statusText,
          resUrl: res.url
        }
        throw error
      }
      return res
    })
    .then(res => res.json())
}
