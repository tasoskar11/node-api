const rewire = require('rewire')
const chai = require('chai')
chai.should()
const expect = chai.expect

const util = rewire('../src/utils/index.js')
const retrieveImdbIdFromViaplayResponse = util.__get__('retrieveImdbIdFromViaplayResponse')
const retrieveKeyFromTrailerResponse = util.__get__('retrieveKeyFromTrailerResponse')


console.log(retrieveImdbIdFromViaplayResponse)

describe('Inside the util library ', () => {
  describe('The private method retrieveImdbIdFromViaplayResponse', () => {
    it('should fail if no argument is passed.', () => {
      expect(() => retrieveImdbIdFromViaplayResponse()).to.throw()
    })
    it('should fail if undefined is passed.', () => {
      expect(() => retrieveImdbIdFromViaplayResponse(undefined)).to.throw()
    })
    it('should pass if proper input is passed.')
  })
  describe('The private method retrieveKeyFromTrailerResponse', () => {
    it('should fail if no argument is passed.', () => {
      expect(() => retrieveKeyFromTrailerResponse()).to.throw()
    })
    it('should fail if undefined is passed.', () => {
      expect(() => retrieveKeyFromTrailerResponse(undefined)).to.throw()
    })
    it('should pass if proper input is passed.', () => {
      expect(() => retrieveKeyFromTrailerResponse({
        'id': 550,
        'results': [
          {
            'id': '5c9294240e0a267cd516835f',
            'iso_639_1': 'en',
            'iso_3166_1': 'US',
            'key': 'BdJKm16Co6M',
            'name': 'Fight Club | #TBT Trailer | 20th Century FOX',
            'site': 'YouTube',
            'size': 1080,
            'type': 'Trailer'
          }
        ]
      }).to.have.property('title'))
    })
  })
  
})
