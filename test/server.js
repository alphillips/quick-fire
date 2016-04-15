var chai    = require("chai");
var expect    = require("chai").expect;
var chaiHttp = require('chai-http');

var app  = require('../lib/quick-fire-server');

chai.use(chaiHttp);

var test_resource_1 = 'cat'
var test_obj = {
                "type": "cat2",
                "name": "Missy"
                }

var url = '/api/' + test_resource_1

describe("Quick Fire Server", function() {

  var newId = null;

  it("POST", function(done) {
    this.timeout(10000);
    chai.request(app)
      .post(url)
      .send(test_obj)
      .then(function (res) {
        newId = res.text;
        expect(res).to.have.status(201);
        done();
      })
      .catch(function (err) {
        throw err;
      })
  });

  it("GET", function(done) {
    this.timeout(10000);
    chai.request(app)
      .get(url + '/' + newId)
      .then(function (res) {
        expect(res).to.have.status(200);
        expect(res.body._id).to.equal(newId);
        done();
      })
      .catch(function (err) {
        throw err;
      })
  });

});
