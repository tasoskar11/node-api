const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../server')

// Configure chai
chai.use(chaiHttp)
chai.should()
const expect = chai.expect

describe('The trailer api /', () => {
  // Test to get all students record
  it('should return 404 for unknown routes.', (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        res.should.have.status(404)
        expect(err).to.be.null
        done()
      })
  })

  it('should return 404 for an empty film query', (done) => {
    chai.request(app)
      .get('/pc-se/film/')
      .end((err, res) => {
        res.should.have.status(404)
        expect(err).to.be.null
        done()
      })
  })

  it('should return 404 for a film that does not exist in viaplay.', (done) => {
    chai.request(app)
      .get('/pc-se/film/adfadfs')
      .end((err, res) => {
        res.should.have.status(404)
        expect(err).to.be.null
        done()
      })
  })

  it('should return 404 for a film that exists in viaplay but has no video in imdb.', (done) => {
    chai.request(app)
      .get('/pc-se/film/the-final-days-of-anne-frank-2015')
      .end((err, res) => {
        res.should.have.status(404)
        expect(err).to.be.null
        done()
      })
  })
})
