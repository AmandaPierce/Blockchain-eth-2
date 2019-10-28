var DegreeAuth = artifacts.require("./DegreeAuthenticator.sol");

contract("DegreeAuthenticator", function(accounts) {
    var degreeAuthInstance;
  
    it("initializes with one university", function() {
      return DegreeAuth.deployed().then(function(instance) {
        return instance.universitiesCount();
      }).then(function(count) {
        assert.equal(count, 1);
      });
    });
  
    it("it initializes the university with the correct values", function() {
      return DegreeAuth.deployed().then(function(instance) {
        degreeAuthInstance = instance;
        return degreeAuthInstance.universities(1);
      }).then(function(university) {
        assert.equal(university[0], "Stellenbosch", "contains the correct name");
        assert.equal(university[1], 0, "contains the correct student count");
      });
    });

    it("adds student to a university", function() {
        return DegreeAuth.deployed().then(function(instance) {
            degreeAuthInstance = instance;
            return degreeAuthInstance.addStudent(1, "19018150", "0xB71075dd72b94C65a69235A511B69Af30161272C");
        }).then(function(receipt) { 
            return degreeAuthInstance.universities(1);
        }).then(function(university) { 
            return university[1];
        }).then(function(count) {
            assert.equal(count, 1);
        });
      });
  });