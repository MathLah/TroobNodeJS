var User = require('../models/user');

exports.postUser = function(req, res) {
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
      res.header('Location', '/users/' + user.username);
      res.set('content-type', 'application/json; charset=utf-8');
      res.json(201, {"ok": 1});
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
    else {
      res.set('content-type', 'application/json; charset=utf-8');
      res.json(users);
    }
  });
};

exports.getUser = function(req, res) {
  User.findOne({username: req.params.name}, function(err, user) {
    if (err || user == null) {
      res
        .status(404)
        .send(err)
        .end();
    }
    else {
      res.set('content-type', 'application/json; charset=utf-8');
      res.json(user);
    }
  });
}

exports.updateUser = function(req, res) {
  User.findOne({username: req.params.name}, function(err, user) {
    if (err || user == null) {
      res
        .status(500)
        .send(err)
        .end();
    }

    user.username =  req.body.username;
    //user.password = req.body.password;

    user.save(function(err) {
      if (err) {
        res
          .status(500)
          .send(err)
          .end();
      }
      else {
        res.header('Location', '/users/' + user.username);
        res.set('content-type', 'application/json; charset=utf-8');
        res.json(200, {"ok": 1});
      }
    });
  });
}

exports.deleteUser = function(req, res) {
  User.findOne({username: req.params.name}, function(err, user) {
    if (err || user == null) {
      res
        .status(500)
        .send(err)
        .end();
    }
    else {
      user.remove();
      res
        .status(204)
        .end();
    }
  });
};


exports.deleteAllUsers = function(req, res) {
  User.remove(function(err,removed) {
    res
      .status(204)
      .end();
  });
};