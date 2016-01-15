var async = require('async');
var Model = require('../models');

module.exports = {
  newest: function(callback) {
    Model.Comment.find({}, {}, {limit: 5, sort: {timestamp: -1} }, function(err, comments) {
      var attachImage = function(comment, next) {
        Model.Image.findOne({_id: comment.image_id}, function(err, image) {
          comment.image = image;
          next(err);
        });
      };
      async.each(comments, attachImage, function(err) {
        if (err) throw err;
        callback(err, comments);
      });
    });
  }
};
