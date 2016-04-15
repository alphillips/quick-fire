var expect    = require("chai").expect;
var repository  = require('../lib/quick-fire-repository');

describe("Quick Fire Repository", function() {

  var test_resource_1 = 'cat'
  var test_obj = {
                  "type": "cat",
                  "name": "Missy"
                  }

  var cat1Id = null;

  it("Save and Get", function(done) {
    repository.save('/api/' + test_resource_1, test_obj, function(id, error){
      cat1Id = id;
      repository.get('/api/' + test_resource_1 + '/' + id, function(data, error){
        expect(data._id).to.equal(id);
        expect(data.name).to.equal(test_obj.name);
        done();
      })
    });
  });

  it("Update", function(done) {
    test_obj.name = 'Silvester';
    repository.update('/api/' + test_resource_1 + '/' + cat1Id, test_obj, function(id, error){
      repository.get('/api/' + test_resource_1 + '/' + id, function(data, error){
        expect(data._id).to.equal(id);
        expect(data.name).to.equal(test_obj.name);
        done();
      })
    });
  });

  // it("Remove", function(done) {
  //   repository.remove('/api/' + test_resource_1 + '/' + cat1Id, function(_id, error){
  //     expect(cat1Id).to.equal(_id);
  //     repository.get('/api/' + test_resource_1 + '/' + cat1Id, function(data, error){
  //
  //       done();
  //     })
  //   });
  // });


});
