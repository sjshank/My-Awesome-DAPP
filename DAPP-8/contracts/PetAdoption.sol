pragma solidity ^0.5.4;
pragma experimental ABIEncoderV2;


contract PetAdoption {
    mapping(address => string) public petAdoptors;
    mapping(address => string) public petNameList;

    event NotifyAdoptor(string petName);

    function adoptPet(string memory _petName, string memory _adoptorName)
        public
        returns(bool)
    {
        bool flag = false;
        require(bytes(_petName).length > 0 && bytes(_adoptorName).length > 0,  "Doesn't meet criteria");
        //if (petNameBytes.length < 0 && adoptorNameBytes.length < 0) {
            //petAdoptors[msg.sender] = _adoptorName;
            //petNameList[msg.sender] = _petName;
            flag = true;
        //}
        //emit NotifyAdoptor(_petName);
        return flag;
    }

    function getAllAdoptorList() public pure returns (string[] memory) {
        string[] memory _adoptLst;
        /*for (uint8 i = 0; i <= petAdoptors.length - 1; i++) {
            _adoptLst.push(petAdoptors[i]);
        }*/
        return _adoptLst;
    }
}
