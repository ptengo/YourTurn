//User Routes
module.exports = function(router) {
  var User = require('../models/User');

router.route('/users')
  // create a user (accessed at POST http://localhost:8080/users)
  .post(function(req, res) {
    var user = new User();      // create a new instance of the User model
      // save the user and check for errors
      user.save(function(err) {
        if (err)
          return res.send(err);

        res.json({ message: 'User created!' });
      });
  })
  .get(function(req, res) {
    User.find(function(err, users) {
      if (err)
        return res.send(err);

      res.json(users);
    });
  });

router.route('/users/:user_id')
  // get the user with that id (accessed at GET http://localhost:8080/users/:user_id)
  .get(function(req, res) {
    User.findById(req.params.user_id, function(err, user) {
      if (err)
        return res.send(err);

      res.json(user);
      });
  })
  .put(function(req, res) {
  // use our user model to find the bear we want
    User.findById(req.params.user_id, function(err, user) {
      if (err)
        return res.send(err);
      user.turn = req.body.turn;  // update the user info
      // save the user
      user.save(function(err) {
        if (err)
          return res.send(err);

        res.json({ message: 'user updated!' });
      });
    });
  })
  .delete(function(req, res) {
    User.remove({
      _id: req.params.userid
    }, function(err, user) {
      if (err)
        return res.send(err);

      res.json({ message: 'Successfully deleted' });
      });
  });
}
