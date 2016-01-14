var sidebar = require('../helpers/sidebar');
var ImageModel = require('../models').Image;

module.exports = {
  index: function(request, response) {
    var viewModel = {images: []};
    
    ImageModel.find({}, {}, {sort: { timestamp: -1 }}, function(err, images) {
      if (err) { throw err; }
      viewModel.images = images;

      sidebar(viewModel, function(viewModel) {
        response.render('index', viewModel);
      });
    });
  }
};
