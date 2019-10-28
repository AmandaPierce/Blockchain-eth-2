pragma solidity ^0.5.0;
import "./Degree.sol";

// contract CompanyVerifier {
//     Company[] companies;

//     struct Company{
//         string name;
//         address wallet;
//     }

//      constructor() public{
//         addCompany("Amazon", 0xAC6C7566d5a612483407A1bd14F4C1B6654Ad2e5);
//      }

//     function addCompany(string memory name, address _wallet) public {
//         companies.push(Company(name, _wallet));
//     }
// }

contract UniversityDegreeAuth {

    Degree public degreeGenerator;
    University university;
    //CompanyVerifier public companyVerifier;
    //mapping(address => University) universities;
    uint universityCount;
    Request[] requests;
    uint requestCount;
    uint studentCount;

    struct University {
        string name;
        address universitywallet;
    }

    struct Student {
        string studentid;
        string name;
        string surname;
        address walletaddress;
        uint degreeTokenCount;
        mapping(uint => uint) degreeTokenIds;
    }

    struct Request {
        string studentid;
        string degreename;
        string degreetype;
        string degreemajor;
    }

   mapping(address => Student) public students;

    constructor (Degree _degree ) public {
        degreeGenerator = _degree;
        universityCount = 0;
        requestCount = 0;
        studentCount = 0;
        //companyVerifier = _cv;
        addUniversity("Stellenbosch University", 0x44240c1bfF58F9cB6F97537de1E9C29360c515cb);
        addStudent("19026672", "Amanda", "Pierce", 0x4676c1e58281E9bbc72bd12028e8b6cd2BCe6757);
    }

    function addUniversity(string memory _name, address _wallet) public {
        university = University(_name, _wallet);
        universityCount++;
    }

    function getUniversityName() public view returns (string memory){
        return university.name;
    }

    function addStudent(string memory _studentid, string memory name, string memory surname, address _wallet) public {
        //bytes32 _id = keccak256(abi.encodePacked(_studentid));
        students[_wallet] = Student(_studentid, name, surname, _wallet, 0);
        studentCount++;
    }

     function getStudentNumber(address studentwallet) public view returns (string memory) {
        Student memory student = students[studentwallet];
        //bytes32 _id = keccak256(abi.encodePacked(_studentid));
        return  student.name;
    }

    // function getStudentName(string memory _studentid) public view returns (string memory) {
    //     bytes32 _id = keccak256(abi.encodePacked(_studentid));
    //     return  students[_id].name;
    // }

    function requestDocument(string memory studentid, string memory degreename, string memory degreetype, string memory degreemajor) public {
        requests.push(Request(studentid, degreename, degreetype, degreemajor));
        requestCount++;
    }

    // function handleRequest(string memory studentid, string memory ipfshash, string memory uniqueKey) public {
    //     Request memory request;
    //     for(uint i = 0; i < requestCount; i++)
    //     {
    //         if (keccak256(abi.encodePacked((requests[i].studentid))) == keccak256(abi.encodePacked((studentid))))
    //         {
    //             request = requests[i];
    //             break;
    //         }
    //     }
    //     addDegree(studentid, request.degreename, request.degreetype, request.degreemajor, ipfshash, uniqueKey);
    // }

    // function addDegree
    // (
    //     string memory studentid,
    //     string memory degreename,
    //     string memory degreetype,
    //     string memory degreemajor,
    //     string memory ipfshash,
    //     string memory uniqueKey
    // ) public
    // {
    //     Student storage student = students[keccak256(abi.encodePacked(studentid))];
    //     address studentaddress = student.walletaddress;
    //     uint _id = degreeGenerator.mint(studentaddress, studentid, degreename, degreetype, degreemajor, ipfshash, uniqueKey);
    //     student.degreeTokenCount ++;
    //     student.degreeTokenIds[student.degreeTokenCount] = _id;
    // }

    // function getDegreeInformation(
    //     string memory degreename,
    //     string memory degreetype,
    //     string memory degreemajor) public view returns (string memory){
    //     return degreeGenerator.getIpfsHash(degreename, degreetype, degreemajor);
    // }

    // function getTotalDegrees() public view returns(uint) {
    //     return degreeGenerator.totalSupply();
    // }

    // function getIndexToken(uint idx) public view returns(uint) {
    //     return degreeGenerator.tokenByIndex(idx);
    // }
}