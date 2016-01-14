module.exports = {
  newest: function() {
    var comments = [
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
      ];
    return comments;
  }
};
