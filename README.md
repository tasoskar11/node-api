# Node.js REST API for providing film trailer URLs

The API should take a movie resource link e.g. <https://content.viaplay.se/pc-se/film/para-knas-2017> as input and based on that return the URL to the trailer for that movie.

## Prerequisites

* npm 6+
* node.js 10+

## .env for local development

You should have a local .env file in the root directory.
Then add your API key value(sent by email) in :
API_KEY=<api_key_value>

## Getting started

1. ```npm install```
2. ```npm start```

## Running the tests

```npm test```

## Use the API

You can use the api just by appending the title like that:
<http://localhost:5001/pc-se/film/para-knas-2017>
The documentation of the endpoint should be available at <http://localhost:5001/api-docs>

## Monitoring and health

An endpoint for prometheus format metrics is exposed under <http://localhost:5001/metrics>. No custom metrics implemented. It should be enough for the basics.

A health endpoint is exposed under <http://localhost:5001/health>