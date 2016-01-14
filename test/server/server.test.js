var expect = require('chai').expect;

describe("Server", function() {
    it('can be started', function(done) {
      browser.url('http://localhost:3300').getText('body', function(err, text) {
          expect(text).to.equal('The home:index controller');
        }).call(done);
    });
});
