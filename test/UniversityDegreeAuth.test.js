const UniversityDegreeAuth = artifacts.require("UniversityDegreeAuth");
const CompanyVerifier = artifacts.require("CompanyVerifier");
const Degree = artifacts.require("./Degree.sol");

require('chai')
.use(require('chai-as-promised'))
.should();

contract("Degree", accounts => {
    let degreeInstance;

    beforeEach('setup contract for each test', async () => {
        degreeInstance = await Degree.new({from: accounts[0]})
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

    describe("minting" , async () => {
        it("should create new degree", async() => {
            const degreeResult = await degreeInstance.mint(accounts[0],"19018150", "Computer Science", "Bsc(Hons)", "informatics", "123Haha", "19018150Bsc(Hons)ComputerScience");
            const totalsupply = await degreeInstance.totalSupply();
            assert.equal(totalsupply, 1);
            const event = degreeResult.logs[0].args;
            assert.equal(event.tokenId.toNumber(), 1, "id is correct");
            assert.equal(event.from, "0x0000000000000000000000000000000000000000", "from is correct");
            assert.equal(event.to, accounts[0], "to is correct");

            await degreeInstance.mint(accounts[0], 1).should.be.rejected;

            // const transfer = await degreeInstance.transferDegree(accounts[0], accounts[1], 1);
            // const event2 = transfer.logs[0].args;
            // assert.equal(event2.from, accounts[0], "from is correct");
            // assert.equal(event2.to, accounts[1], "to is correct");
            
        });
    });

  });

contract("UniversityDegreeAuth", accounts => {
    let UniversityDegreeAuthInstance;
    let degreeInstance;
    let companyInstance;

    before(async () => {
        degreeInstance = await Degree.deployed({from: accounts[0]});
        companyInstance = await CompanyVerifier.deployed();
        UniversityDegreeAuthInstance = await UniversityDegreeAuth.deployed(degreeInstance, companyInstance);
    });

    describe("deployment" , async () => {

        it("should deploy", async () => {
            const address = await UniversityDegreeAuthInstance.address;
            assert.notEqual(address, "");
            assert.notEqual(address, 0x0);
            assert.notEqual(address, null);
            assert.notEqual(address, undefined);
          });

        it("should add a university", async () => {
            await UniversityDegreeAuthInstance.addUniversity("Stellenbosch University", accounts[0]);
            const name = await UniversityDegreeAuthInstance.getUniversityName(accounts[0]);
            assert.equal(name, "Stellenbosch University");

        });

        it("should add a student", async () => {
            await UniversityDegreeAuthInstance.addStudent("19018150", "Amanda", "Pierce", accounts[1]);
            const name = await UniversityDegreeAuthInstance.getStudent("19018150");
            assert.equal(name, "Amanda");

        });
    });

    describe("minting" , async () => {
        it("should create new degree", async() => {
            const degreeResult = await UniversityDegreeAuthInstance.addDegree("19018150", "Computer Science", "Bsc(Hons)", "informatics", "123Haha", "19018150Bsc(Hons)ComputerScience");
            const totalsupply = await UniversityDegreeAuthInstance.getTotalDegrees();
            assert.equal(totalsupply, 1);
            const val = await degreeInstance.tokenOfOwnerByIndex(accounts[1],0);
            assert.equal(val, 1);
            
          
            //Failure
           await UniversityDegreeAuthInstance.addDegree("19018150", "Computer Science", "Bsc(Hons)", "informatics", "123Haha", "19018150Bsc(Hons)ComputerScience").should.be.rejected;
            
        });
    });

    describe("indexing" , async () => {
        it("lists degrees", async() => {
            await UniversityDegreeAuthInstance.addDegree("19018150", "Computer Science", "Bsc", "informatics", "123Haha", "19018150BscComputerScience");
            await UniversityDegreeAuthInstance.addDegree("19018150", "Information Science", "Bis", "informatics", "123Haha", "19018150BisMultimedia");
            const totalsupply = await UniversityDegreeAuthInstance.getTotalDegrees();
            assert(totalsupply, 3);

            let degree;
            let results = [];

            for(var i = 0; i < totalsupply; i++)
            {
                degree = await degreeInstance.degrees(i);
                results.push(degree.degreetype);
            }

            let expectedResult = ["Bsc(Hons)", "Bsc", "Bis"];

            assert.equal(expectedResult.join(','), results.join(','));
        });
    });

    describe("request" , async () => {
        it("should create a new request", async() => {
            await UniversityDegreeAuthInstance.requestDocument("19018150", "Computer Science", "BA", "informatics");
            const totalsupply = await UniversityDegreeAuthInstance.getTotalDegrees();
            assert.equal(totalsupply, 3);
            await UniversityDegreeAuthInstance.handleRequest("19018150", "123Haha", "19018150BAMultimedia");
            const totalsupply2 = await UniversityDegreeAuthInstance.getTotalDegrees();
            assert.equal(totalsupply2, 4);

            const hash = await UniversityDegreeAuthInstance.getDegreeInformation("Computer Science", "BA", "informatics");
            assert.equal(hash, "123Haha");
        });
    });

  });
  
  contract("CompanyVerifier", accounts => {
    let ADVInstance;

    before(async () => {
        ADVInstance = await CompanyVerifier.deployed();
    });

    describe("deployment" , async () => {

        it("should deploy", async () => {
            const address = await ADVInstance.address;
            assert.notEqual(address, "");
            assert.notEqual(address, 0x0);
            assert.notEqual(address, null);
            assert.notEqual(address, undefined);
          });
        });

        it("should add a company", async () => {
            await ADVInstance.addCompany("Amazon", accounts[3]);
        });
    });