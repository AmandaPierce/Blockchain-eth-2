var Degree = artifacts.require("./Degree.sol");
//var UniversityDegreeAuth = artifacts.require("UniversityDegreeAuth");
var Companies = artifacts.require("Companies");
//var Universities = artifacts.require("Universities");
var UniversityDegreeAuthenticator = artifacts.require("UniversityDegreeAuthenticator");

module.exports = function(deployer){
    deployer.deploy(Degree).then( function () {
        return deployer.deploy(Companies);
    }).then( function () {
        return deployer.deploy(UniversityDegreeAuthenticator, Degree.address, Companies.address);
    });
};

// module.exports = function(deployer){
//     deployer.deploy(Degree).then( function () {
//         return deployer.deploy(Universities, Degree.address);
//     });
// };

// module.exports = function(deployer){
//     deployer.deploy(Universities);
// };
