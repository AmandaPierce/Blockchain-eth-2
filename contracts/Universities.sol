pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;
import "./Degree.sol";


// contract Universities {
//     mapping(address => University) public universities;
//     uint public universityCount;
//     Degree public degreeGenerator;
//     Companies public companies;

//     constructor(Degree _degree, Companies _companies) public
//     {
//         degreeGenerator = _degree;
//         companies = _companies;
//         universityCount = 0;
//         addUniversity("Stellenbosch University", "randomnum", 0x6C27fCEccC9A545f9965cA486cbEa5492a041CC4);
//     }

//     function addUniversity(string memory _name, string memory _identifier, address _wallet) public
//     {
//         University university = new University (_name, _identifier, _wallet, degreeGenerator, companies);
//         universities[_wallet] = university;
//         universityCount++;
//     }

//     function getUniversityInstance(address _wallet) public view returns (University) {
//         return universities[_wallet];
//     }

//     function getUniversityCount() public view returns (uint){
//         return universityCount;
//     }
// }

contract Companies {
    Company[] companies;
    uint public companyCount;

    struct Company{
        string name;
        address wallet;
    }

     constructor() public{
        companyCount = 0;
     }

    function addCompany(string memory name, address _wallet) public {
        companies.push(Company(name, _wallet));
        companyCount ++;
    }
}

contract UniversityDegreeAuthenticator{

    Degree public degreeGenerator;
    mapping(uint => address) public degreeTokenIds;
    uint degreeTokenCount;
    Companies public companies;
    University currentUniversity;

    struct University {
        string universityName;
        string identifier;
        address wallet;
    }

    mapping(address => Student) students;
    uint studentCount;
    mapping(uint => Request) requests;
    uint requestCount;

    struct Student {
        string studentid;
        string name;
        string surname;
        address walletaddress;
        bool exists;
    }

    struct Request {
        string studentid;
        string degreename;
        string degreetype;
        string degreemajor;
        address walletaddress;
    }

    constructor(Degree _degree, Companies _companies) public
    {
        addUniversity("Stellenbosch University", "randomnum", 0x6C27fCEccC9A545f9965cA486cbEa5492a041CC4);
        degreeGenerator = _degree;
        degreeTokenCount = 0;
        companies = _companies;
        addStudent("19026672", "Amanda", "Pierce", 0x13ce81Ec624884Fc69E1C9eA60f962164d0Ac342);
    }

    function addUniversity(string memory _name, string memory _identifier, address _wallet) public
    {
        University memory university = University(_name, _identifier, _wallet);
        currentUniversity = university;
    }

    function isRegisteredUser() public view returns (string memory)
    {
        if(!students[msg.sender].exists)
        {
            require((currentUniversity.wallet == msg.sender), "University does not exist");
            return "university";
        }
        else
        {
            return "student";
        }
    }

    function getName() public view returns (string memory)
    {
        string memory currentType = isRegisteredUser();

        if(keccak256(abi.encodePacked(currentType)) == keccak256(abi.encodePacked("university")))
        {
            return currentUniversity.universityName;
        }
        else
        {
            return string(abi.encodePacked(students[msg.sender].studentid, ": ", students[msg.sender].name, " ", students[msg.sender].surname));
        }
    }

    function getTotalRequests() public view returns (uint)
    {
        return requestCount;
    }

    function addStudent(string memory _studentid, string memory _studentname, string memory _surname, address _wallet) public {
        //bytes32 _id = keccak256(abi.encodePacked(_studentid));
        students[_wallet] = Student(_studentid, _studentname, _surname, _wallet, true);
        studentCount++;
    }

    function getStudentInformation() public view returns (Student memory) {
        require((students[msg.sender].exists), "Student does not exist");
        Student memory student = students[msg.sender];
        //bytes32 _id = keccak256(abi.encodePacked(_studentid));
        return student;
    }

    function getAllDegrees() public view returns (string[] memory) {

        string[] memory allDegrees = new string[](degreeTokenCount);
        uint idx = 0;

        for(uint i = 0; i < degreeTokenCount; i++)
        {
            address tmp = degreeTokenIds[i+1];
            if(tmp == msg.sender)
            {
                allDegrees[idx] = degreeGenerator.getDegreeInformation(i);
                idx++;
            }
        }

        return allDegrees;
    }

    function requestDocument(string memory studentid, string memory degreename, string memory degreetype, string memory degreemajor) public {
        requestCount++;
        requests[requestCount] = Request(studentid, degreename, degreetype, degreemajor, msg.sender);
    }

    function getAllRequests(uint i) public view returns (string memory, address) {

        string memory req = string(abi.encodePacked(requests[i].studentid, ": ", requests[i].degreename, " ", requests[i].degreetype, " ", requests[i].degreemajor));
        address ad = requests[i].walletaddress;

        return (req,ad);
    }

    function handleRequest(string memory studentid, string memory ipfshash, string memory uniqueKey) public {
        Request memory request;
        uint idx;
        for(uint i = 1; i <= requestCount; i++)
        {
            if (keccak256(abi.encodePacked((requests[i].studentid))) == keccak256(abi.encodePacked((studentid))))
            {
                request = requests[i];
                idx = i;
                break;
            }
        }
        addDegree(request.walletaddress, request.studentid, request.degreename, request.degreetype, request.degreemajor, ipfshash, uniqueKey);
        delete requests[idx];
        requestCount--;
    }

    function addDegree
    (
        address studentaddress,
        string memory studentid,
        string memory degreename,
        string memory degreetype,
        string memory degreemajor,
        string memory ipfshash,
        string memory uniqueKey
    ) public
    {
        uint _id = degreeGenerator.mint(studentaddress, studentid, degreename, degreetype, degreemajor, ipfshash, uniqueKey);
        degreeTokenCount++;
        degreeTokenIds[_id] = studentaddress;
    }

    function getTotalDegrees() public view returns(uint) {
        return degreeGenerator.totalSupply();
    }
 
    function getDegreeHash
    (
        string memory degreename,
        string memory degreetype,
        string memory degreemajor
    ) public view returns (string memory) {
        return degreeGenerator.getIpfsHash(degreename, degreetype, degreemajor);
    }
}
