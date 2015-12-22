var supertest = require("supertest");
var should = require("should");
var User = require('../models/user');
var mongoose = require('mongoose');

// UNIT test begin
var server = supertest.agent("http://localhost:3000");
var userId = null;

describe("USER unit test",function(){

  it("Should NOT CREATE an user with post cause : bad request 'No Username'", function(done) {
    server
      .post('/users')
      .send({"password": "testUser"})
      .expect("Content-type",/json/)
      .expect(500)
      .end(function(err, res){
        should.exist(res);
        res.status.should.equal(500);
        (res.body.error === null).should.be.true;
        should.exist(res.body.name);
        res.body.name.should.equal("ValidationError");
        done();
      });
  });

  it("Should NOT CREATE an user with post cause : bad request 'No Password'", function(done) {
    server
      .post('/users')
      .send({"username": "testUser"})
      .expect("Content-type",/json/)
      .expect(500)
      .end(function(err, res){
        should.exist(res);
        res.status.should.equal(500);
        (res.body.error === null).should.be.true;
        should.exist(res.body.name);
        res.body.name.should.equal("ValidationError");
        done();
      });
  });

  it("Should CREATE an user with post", function(done) {
    server
      .post('/users')
      .send({"username": "testUser", "password": "testUser"})
      .expect("Content-type",/json/)
      .expect(200)
      .end(function(err, res){
        should.exist(res);
        res.status.should.equal(200);
        (res.body.error === null).should.be.true;
        should.exist(res.body.id);
        userId = res.body.id;
        done();
      });
  });

  it("Should NOT CREATE an user with post cause : duplicate", function(done) {
    server
      .post('/users')
      .send({"username": "testUser", "password": "testUser"})
      .expect("Content-type",/json/)
      .expect(500)
      .end(function(err, res){
        should.exist(res);
        res.status.should.equal(500);
        (res.body.error === null).should.be.true;
        should.exist(res.body.code);
        res.body.code.should.equal(11000);
        done();
      });
  });

  it("Should DELETE testUser", function(done) {
    server
      .delete('/users/testUser')
      .expect("Content-type",/json/)
      .expect(200)
      .end(function(err, res){
        should.exist(res);
        res.status.should.equal(204);
        done();
      });
  });

});