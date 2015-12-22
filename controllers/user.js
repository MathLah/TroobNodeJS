var User = require('../models/user');

exports.postUsers = function(req, res) {
  var user = new User({
    username: req.body.username,
    password: req.body.password
  });

  user.save(function(err) {
    if (err) {
      res
        .status(500)
        .send(err)
        .end();
    }
    else {
      res.json({ id: user._id });
    }
  });
};

exports.getUsers = function(req, res) {
  User.find(function(err, users) {
    if (err) {
      res
        .status(500)
        .send(err)
        .end();
    }

    res.json(users);
  });
};

exports.deleteUsers = function(req, res) {
  User.findOne({username: req.params.name}, function(err, user) {
    if (err || user == null) {
      res
        .status(500)
        .send(err)
        .end();
    }

    user.remove();
    res
      .status(204)
      .end();

  });
};


exports.deleteAllUsers = function(req, res) {
  User.remove(function(err,removed) {
    res
      .status(204)
      .end();
  });
};