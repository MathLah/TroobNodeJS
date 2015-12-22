var supertest = require("supertest");
var should = require("should");
var User = require('../models/user');
var mongoose = require('mongoose');

var server = supertest.agent("http://localhost:3000");
var token = null;

describe("USER unit test",function(){
  it("Should LOGIN.", function(done) {
    server
      .post('/api/oauth2/token')
      .send({
          "grant_type": "password",
          "username": "mlahousse",
          "password": "mlahousse",
          "scope": "*",
          "clientId": "mlahousse"
      })
      .set('Authorization', 'Basic bWxhaG91c3NlOmNsaWVudC1zZWNyZXQ=')
      .expect("Content-type",/json/)
      .expect(200)
      .end(function(err, res){
        should.exist(res);
        res.status.should.equal(200);
        (res.body.error === null).should.be.true;
        should.exist(res.body.refreshToken);
        token = res.body.refreshToken;
        done();
      });
  });
  it("Should NOT CREATE an user. Cause : bad request 'No Username'", function(done) {
    server
      .post('/users')
      .send({"password": "testUser"})
      .expect("Content-type",/json/)
      .set('Authorization', 'Bearer ' + token)
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

  it("Should NOT CREATE an user. Cause : bad request 'No Password'", function(done) {
    server
      .post('/users')
      .send({"username": "testUser"})
      .expect("Content-type",/json/)
      .set('Authorization', 'Bearer ' + token)
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

  it("Should CREATE an user testUser", function(done) {
    server
      .post('/users')
      .send({"username": "testUser", "password": "testUser"})
      .expect("Content-type",/json/)
      .set('Authorization', 'Bearer ' + token)
      .expect(201)
      .end(function(err, res){
        should.exist(res);
        res.status.should.equal(201);
        (res.body.error === null).should.be.true;
        should.exist(res.body.ok);
        res.body.ok.should.equal(1);
        done();
      });
  });

  it("Should NOT CREATE an user testUser. Cause : duplicate", function(done) {
    server
      .post('/users')
      .send({"username": "testUser", "password": "testUser"})
      .expect("Content-type",/json/)
      .set('Authorization', 'Bearer ' + token)
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

  it("Should Get user testUser", function(done) {
    server
      .get('/users/testUser')
      .expect("Content-type",/json/)
      .set('Authorization', 'Bearer ' + token)
      .expect(200)
      .end(function(err, res){
        should.exist(res);
        res.status.should.equal(200);
        (res.body.error === null).should.be.true;
        should.exist(res.body.username);
        res.body.username.should.equal("testUser");
        done();
      });
  });

  it("Should UPDATE user testUser", function(done) {
    server
      .put('/users/testUser')
      .send({"username": "testUserr"})
      .expect("Content-type",/json/)
      .set('Authorization', 'Bearer ' + token)
      .expect(200)
      .end(function(err, res){
        should.exist(res);
        res.status.should.equal(200);
        (res.body.error === null).should.be.true;
        should.exist(res.body.ok);
        res.body.ok.should.equal(1);

        done();
      });
  });

  it("Should Not Get user testUser", function(done) {
    server
      .get('/users/testUser')
      .expect("Content-type",/json/)
      .set('Authorization', 'Bearer ' + token)
      .expect(404)
      .end(function(err, res){
        should.exist(res);
        res.status.should.equal(404);
        done();
      });
  });

  it("Should UPDATE user testUserr", function(done) {
    server
      .put('/users/testUserr')
      .send({"username": "testUser"})
      .expect("Content-type",/json/)
      .set('Authorization', 'Bearer ' + token)
      .expect(200)
      .end(function(err, res){
        should.exist(res);
        res.status.should.equal(200);
        (res.body.error === null).should.be.true;
        should.exist(res.body.ok);
        res.body.ok.should.equal(1);
        done();
      });
  });

  it("Should DELETE testUser", function(done) {
    server
      .delete('/users/testUser')
      .expect("Content-type",/json/)
      .set('Authorization', 'Bearer ' + token)
      .expect(200)
      .end(function(err, res){
        should.exist(res);
        res.status.should.equal(204);
        done();
      });
  });

});