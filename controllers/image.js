var fs = require('fs');
var path = require('path');
var sidebar = require('../helpers/sidebar');

module.exports = {
  index: function(request, response) {
    var viewModel = {
    image:
        {
          uniqueId:       1,
          title:          'Sample Image 1',
          description:    'This is an awesome sample image',
          filename:       'sample1.png',
          views:          0,
          likes:          23,
          timestamp:      Date.now,
          },

    comments: [
      {
          image_id:   1,
          email:      'test@testing.com',
          name:       'Test Tester',
          gravatar:   'http://lorempixel.com/75/75/animals/1',
          comment:    'This is a test comment...',
          timestamp:  Date.now()
      },{
          image_id:   1,
          email:      'test@testing.com',
          name:       'Test Tester',
          gravatar:   'http://lorempixel.com/75/75/animals/2',
          comment:    'Another comment!',
          timestamp:  Date.now()
        }
      ]
    };
    sidebar(viewModel, function(viewModel) {
      response.render('image', viewModel);
    });
  },
  create: function(request, response) {
    var saveImage = function() {
      var possible = 'abcdefghijklmnopqrstuvwxyz0123456789';
      var imgUrl = '';
      for(var i=0; i < 6; i+=1) {
        imgUrl += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      var tempPath = request.file.path;
      var ext = path.extname(request.file.originalname).toLowerCase();
      var targetPath = path.resolve('./public/upload'+imgUrl+ext);
      if (ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif') {
        fs.rename(tempPath, targetPath, function(err) {
          if (err) throw err;
          response.redirect('/images/'+ imgUrl);
        });
      } else {
        fs.unlink(tempPath, function (err) {
          if (err) throw err;
          response.json(500, {error: 'Only image files are allowed.'});
        });
      }
    };
    saveImage();
  },

  like: function(request, response) {
    response.json({likes: 1});
  },
  comment: function(request, response) {
    response.send('The image:comment POST controller');
  }
};
