var fs = require('fs');
var path = require('path');
var md5 = require('md5');
var sidebar = require('../helpers/sidebar');
var Models = require('../models');


module.exports = {
  index: function(request, response) {
    var viewModel = {
    image: {},
    comments: []
    };
    Models.Image.findOne({ filename: {$regex: request.params.image_id} },
      function(err, image) {
        if (err) { throw err; }
        if (image) {
          image.views = image.vies + 1;
          viewModel.image = image;
          image.save();
          Models.Comment.find({ image_id: image._id}, {}, { sort: { 'timestamp': 1} },
          function(err, comments) {
            if (err) { throw err; }
            viewModel.comments = comments;
            sidebar(viewModel, function(viewModel) {
              response.render('image', viewModel);
            });
          });
        } else {
          response.redirect('/');
        }
      });
  },
  create: function(request, response) {
    var saveImage = function() {
      var possible = 'abcdefghijklmnopqrstuvwxyz0123456789';
      var imgUrl = '';
      for(var i=0; i < 6; i+=1) {
        imgUrl += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      Models.Image.find({filename: imgUrl}, function(err, images) {
        if (images.length > 0 ) {
          saveImage();
        } else {
          var tempPath = request.file.path;
          var ext = path.extname(request.file.originalname).toLowerCase();
          var targetPath = path.resolve('./public/upload/'+imgUrl+ext);
          if (ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif') {
            fs.rename(tempPath, targetPath, function(err) {
              if (err) throw err;
              var newImg = new Models.Image({
                title: request.body.title,
                description: request.body.description,
                filename: imgUrl+ext
              });
              newImg.save(function(err, image) {
                console.log("Image successsfully inserted, name:"+image.filename);
                response.redirect('/images/'+ image.uniqueId);
              });
            });
          } else {
            fs.unlink(tempPath, function (err) {
              if (err) throw err;
              response.json(500, {error: 'Only image files are allowed.'});
            });
          }
        }
      });
    };
    saveImage();
  },

  like: function(request, response) {
    Models.Image.findOne({ filename: { $regex: request.params.image_id } },
    function(err, image) {
      if (!err && image) {
        image.likes = image.likes+1;
        image.save(function(err) {
          if (err) {
            response.json(err);
          } else {
            response.json({ likes: image.likes });
          }
        });
      }
    });
  },
  comment: function(request, response) {
    Models.Image.findOne({ filename : { $regex: request.params.image_id } },
      function(err, image) {
        if (!err && image) {
          var newComment = new Models.Comment(request.body);
          newComment.gravatar = md5(newComment.email);
          newComment.image_id = image._id;
          newComment.save(function(err, comment) {
            if (err) { throw err; }
            response.redirect('/images/'+image.uniqueId+'#'+comment._id);
          });
        } else {
          response.redirect('/');
        }
      });
    }
};
