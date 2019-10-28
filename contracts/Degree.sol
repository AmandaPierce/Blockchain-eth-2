pragma solidity ^0.5.0;

import "../client/node_modules/@openzeppelin/contracts/token/ERC721/ERC721Full.sol";
import "../client/node_modules/@openzeppelin/contracts/ownership/Ownable.sol";

contract Degree is ERC721Full{
    
    struct DegreeFile {
        string studentid;
        string degreename;
        string degreetype;
        string degreemajor;
        string ipfshash;
    }
    
    DegreeFile[] public degrees;
    mapping (string => bool) _degreeExists;

    constructor() ERC721Full("Degree", "DEG") public{
    }

    //Need to fix onlyOwner
    function mint (
        address studentwallet,
        string memory studentid,
        string memory degreename,
        string memory degreetype,
        string memory degreemajor,
        string memory ipfshash,
        string memory uniqueKey
    ) public returns (uint){
        require(!_degreeExists[uniqueKey], "already exists");
        DegreeFile memory degree = (DegreeFile(studentid, degreename, degreetype, degreemajor, ipfshash));
        uint _id = degrees.push(degree);
        _mint(studentwallet, _id);
        _degreeExists[uniqueKey] = true;
        //_transferFrom(msg.sender, studentwallet, _id);
        return _id;
    }

    function getIpfsHash
    (
        string memory degreename,
        string memory degreetype,
        string memory degreemajor) public view returns (string memory)
    {
        string memory ipfs;

        for(uint i = 0; i < totalSupply(); i++)
        {
            if(keccak256(abi.encodePacked(degrees[i].degreename)) == keccak256(abi.encodePacked(degreename)) &&
            keccak256(abi.encodePacked(degrees[i].degreetype)) == keccak256(abi.encodePacked(degreetype)) &&
            keccak256(abi.encodePacked(degrees[i].degreemajor)) == keccak256(abi.encodePacked(degreemajor)))
            {
                ipfs = degrees[i].ipfshash;
                break;
            }
        }

        return ipfs;
    }

    function getDegreeInformation(uint _id) public view returns (string memory)
    {
       DegreeFile memory df;
       df = degrees[_id];
       return string(abi.encodePacked(df.degreetype," ",df.degreename," ",df.degreemajor));
    }
}
