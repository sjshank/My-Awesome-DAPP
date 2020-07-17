pragma solidity ^0.5.4;


contract SampleContract {
    // Private variable
    uint256 private data;
    //Public variable
    uint256 public info;

    //Construtor for Contract
    constructor() public {
        info = 10;
    }

    //Private function
    //Pure keyword - since no use of any state variable inside function. neither reading nor editing
    function incrementor(uint256 a) private pure returns (uint256) {
        return ++a;
    }

    //Public function
    function updateData(uint256 a) public {
        data = a;
    }

    //Public function
    // View keyword - Use when you are using state variable inside function and not changing it's state(Only readonly)
    function getData() public view returns (uint256) {
        return data;
    }

    //Internal function - intend to use internally or inside derived contract
    function compute(uint256 a, uint256 b) internal pure returns (uint256) {
        return a + b;
    }
}

/*
*   Inheritance
*/
contract D is SampleContract {
    uint256 public result;

    function getComputedResult(uint256 a, uint256 b) public returns (uint256) {
        //Internal marked function can be used inside derived contract without referencing contract instance
        result = compute(a, b);
    }

    function getResult() public view returns (uint256) {
        //Internal marked function can be used inside derived contract without referencing contract instance
        return result;
    }
}
