pragma solidity ^0.5.4;

contract SampleContract{
    // Dynamic array for integer datatype
    uint[] public listOfIds;

    // push Id into dynamic array
    function setId(uint id) public{
        listOfIds.push(id);
    }

    // Retreive all integer values from array
    // View - to read state variable
    // Returns - Return type uint array
    function getAllId() public view returns(uint[] memory) {
        return listOfIds;
    }

    // Retreive an integer value from array based on position
    // View - to read state variable
    // Returns - Return type uint value
    function getId(uint position) public view returns(uint id){
        if(listOfIds.length > 0){
            return listOfIds[position];
        }
    }

    // View - to read state variable
    // Returns - Return type uint
    function getLength() public view returns(uint id){
        return listOfIds.length;
    }
}