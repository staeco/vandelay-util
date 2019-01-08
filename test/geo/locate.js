/*eslint no-console: 0*/
import should from 'should'

const locate = require('../../src/geo/locate.js')

describe('geo#locate', function () {
  it('should exist', async () => {
    should.exist(locate)
    should.equal(typeof locate, 'function')
  })
})
