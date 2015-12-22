var supertest = require("supertest");
var should = require("should");
var User = require('../models/user');
var mongoose = require('mongoose');

var server = supertest.agent("http://localhost:3000");

describe("Auth unit test",function(){
  it("Should NOT LOGIN. Cause : bad username", function(done) {
    server
      .post('/api/oauth2/token')
      .send({
          "grant_type": "password",
          "username": "fakeuser",
          "password": "fakeuser",
          "scope": "*",
          "clientId": "fakeuser"
      })
      .set('Authorization', 'Basic bWxhaG91c3NlOmNsaWVudC1zZWNyZXQ=')
      .expect("Content-type",/json/)
      .expect(403)
      .end(function(err, res){
        should.exist(res);
        res.status.should.equal(403);
        (res.body.error === null).should.be.true;
        done();
      });
  });
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
        done();
      });
  });
});