var supertest = require("supertest");
var should = require("should");
var User = require('../models/user');
var mongoose = require('mongoose');

// UNIT test begin

describe("USER unit test",function(){

  it("should connect mongoose databse",function(done){
    mongoose.connect('mongodb://localhost/troobnodejstest', function(err) {
        (err === null).should.be.true;
        done();
    });
  });

  it("should create user",function(done){

    var user = new User({
      username: "testUser",
      password: "testUser"
    });

    user.save(function(err) {
      (err === null).should.be.true;
      done();
    });

  });

  it("should get users",function(done){

    User.find(function(err, users) {
      (err === null).should.be.true;
      users[0].username.should.equal("testUser");
      done();
    });

  });

  it("should drop database",function(done){
    mongoose.connection.collections['users'].drop( function(err) {
      done();
    })
  });


});