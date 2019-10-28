const Degree = artifacts.require("./Degree.sol");
const DegreeAuthenticator = artifacts.require("./DegreeAuthenticator.sol");

require('chai')
.use(require('chai-as-promised'))
.should()

contract("Degree", accounts => {
    let degreeInstance;

    before(async () => {
        degreeInstance = await Degree.deployed();
    });

    describe("deployment" , async () => {

        it("should deploy", async () => {
            const address = await degreeInstance.address;
            assert.notEqual(address, "");
            assert.notEqual(address, 0x0);
            assert.notEqual(address, null);
            assert.notEqual(address, undefined);
          });
      
          it("has a name", async () => {
              const name = await degreeInstance.name();
              assert.equal(name, "Degree");
            });
      
          it("has a symbol", async () => {
          const name = await degreeInstance.symbol();
          assert.equal(name, "DEG");
          });
      
    });

  });

  contract("DegreeAuthenticator", accounts => {

    let degreeAuthInstance;

    before(async () => {
        degreeAuthInstance = await DegreeAuthenticator.deployed();
    });

    describe("deployment" , async () => {

        it("should deploy", async () => {
            const address = degreeAuthInstance.address;
            assert.notEqual(address, "");
            assert.notEqual(address, 0x0);
            assert.notEqual(address, null);
            assert.notEqual(address, undefined);
          });

        it("should add university", async () => {
          await degreeAuthInstance.addUniversity("Stellenbosch", accounts[0]);
          await degreeAuthInstance.addStudent("19018150", "Amanda Pierce", "0xB71075dd72b94C65a69235A511B69Af30161272C");
        
        });
      
    });

    // describe("student operations" , async () => {

    //   it("should add student", async () => {
    //       const address = degreeAuthInstance.address;
    //       assert.notEqual(address, "");
    //       assert.notEqual(address, 0x0);
    //       assert.notEqual(address, null);
    //       assert.notEqual(address, undefined);
    //     });
    
  });

    // describe("minting" , async () => {
    //     it("should create new degree", async() => {
    //         const degreeResult = await degreeInstance.mint("Amanda Pierce", "Computer Science", "Bsc(Hons)", "informatics", "123Haha", "19018150Bsc(Hons)ComputerScience");
    //         const totalsupply = await degreeInstance.totalSupply();
    //         assert.equal(totalsupply, 1);
    //         const event = degreeResult.logs[0].args;
    //         assert.equal(event.tokenId.toNumber(), 1, "id is correct");
    //         assert.equal(event.from, "0x0000000000000000000000000000000000000000", "from is correct");
    //         assert.equal(event.to, accounts[0], "to is correct");

    //         await degreeInstance.mint("Amanda Pierce", "Computer Science", "Bsc(Hons)", "informatics", "123Haha", "19018150Bsc(Hons)ComputerScience").should.be.rejected;
            
    //     });
    // });

    // describe("indexing" , async () => {
    //     it("lists degrees", async() => {
    //         await degreeInstance.mint("Amanda Pierce", "Computer Science", "Bsc", "informatics", "123Haha", "19018150BscComputerScience");
    //         await degreeInstance.mint("Amanda Pierce", "Information Science", "Bis", "informatics", "123Haha", "19018150BisMultimedia");
    //         const totalsupply = await degreeInstance.totalSupply();

    //         let degree;
    //         let results = [];

    //         for(var i = 0; i < totalsupply; i++)
    //         {
    //             degree = await degreeInstance.degrees(i);
    //             results.push(degree.degreetype);
    //         }


    //         let expectedResult = ["Bsc(Hons)", "Bsc", "Bis"];

    //         assert.equal(expectedResult.join(','), results.join(','));
    //     });
    // });
