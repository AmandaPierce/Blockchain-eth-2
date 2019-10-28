pragma solidity ^0.5.0;
import "./Degree.sol";

contract DegreeAuthenticator {

    string public universityidentifier;
    address private universitywallet;
    Degree public degreeGenerator;
    Request[] private requests;

    mapping(string => Student) students;
    uint studentCount;

    struct Request {
        string studentid;
        string degreename;
        string degreetype;
    }

    struct DegreeFile {
        string studentname;
        string degreename;
        string degreetype;
        string degreemajor;
        string ipfshash;
    }

    struct Student {
        string studentid;
        string name;
        address walletaddress;
        uint degreecount;
        mapping(uint => DegreeFile) degrees;
    }

    mapping (string => bool) _degreeExists;

    constructor (Degree _degree) public {
        addUniversity("Stellenbosch", msg.sender);
        degreeGenerator = _degree;
    }

    function addUniversity(string memory _identifier, address wallet) public {
        universityidentifier = _identifier;
        universitywallet = wallet;
    }

    function addStudent(string memory studentid, string memory name, address _walletaddress) public {
        studentCount++;
        students[studentid] = Student(studentid, name, _walletaddress, 0);
    }

    function requestDegree(string memory studentid, string memory degreename, string memory degreetype) public {
        requests.push(Request(studentid,degreename,degreetype));
    }
}