var expect = require('chai').expect;

describe("Routes", function() {

  describe("Home page", function() {

    it('navigates to home page', function(done) {
      browser
        .url('http://localhost:3300/')
        .getText('body', function(err, text) {
          expect(text).to.equal('The home:index controller');
        })
        .call(done);
    });

  });

  describe("Image", function() {

    it('navigates to a image', function(done) {
      browser
        .url('http://localhost:3300/images/234')
        .getText('body', function(err, text) {
          expect(text).to.equal('The image:index controller 234');
        })
      .call(done);
    });



    // it('creates an image', function(done) {
    //   browser
    //     .url('http://localhost:3300/images/')
    //     .getText('body', function(err, text) {
    //       expect(text).to.equal('The image:create POST controller');
    //     });
    //   }).call(done);

    //   it('likes an image', function(done) {
    //     browser
    //       .url('http://localhost:3300/images/234/like')
    //       .getText('body', function(err, text) {
    //         expect(text).to.equal('The image:like POST controller');
    //       });
    //     }).call(done);
    //
    //   it('comments an image', function(done) {
    //     browser
    //       .url('http://localhost:3300/images/234/comment')
    //       .getText('body', function(err, text) {
    //         expect(text).to.equal('The image:comment POST controller');
    //       });
    //     }).call(done);

    });

});
