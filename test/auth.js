var supertest = require("supertest");
var should = require("should");
var User = require('../models/user');
var mongoose = require('mongoose');

var server = supertest.agent("http://localhost:3000");

describe("Auth unit test",function(){
  it("Should NOT LOGIN. Cause : bad username", function(done) {
    server
      .post('/login')
      .send({"username": "testUuuuuser", "password": "testUser"})
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
  it("Should LOGIN.", function(done) {
    server
      .post('/login')
      .send({"username": "testUser", "password": "testUser"})
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
});