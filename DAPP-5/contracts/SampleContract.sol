pragma solidity ^0.5.4;

contract SampleContract{

    // integer datatype declaration
    uint public result = 0;

    // function to add 2 numbers
    // Pure - not reading or writing state variable
    // Returns - return type uint
    function addition() public pure returns(uint res){
        uint a = 1;
        uint b = 2;
        res = a + b;
        return res;
    }

    /*
    *   Method overloading
    */

    // Add 2 integers and return result
    // internal - to scope function within contract
    // Pure - not reading or writing state variable. Only processing local variables
    function getSum(uint a, uint b) internal pure returns(uint res){
        res = a + b;
        return res;
    }

    // Add 2 integers and return result
    // internal - to scope function within contract
    // Pure - not reading or writing state variable. Only processing local variables
    function getSum(uint a, uint b, uint c) internal pure returns(uint res){
        res = a + b + c;
        return res;
    }

    // Public function that will get called from outside
    // Pure - not reading or writing state variable. Only processing local variables
    function addTwoNumbers(uint a, uint b) public pure returns(uint){
        return getSum(a, b);
    }

    // Public function that will get called from outside
    // Pure - not reading or writing state variable. Only processing local variables
    function addThreeNumbers(uint a, uint b, uint c) public pure returns(uint){
        return getSum(a, b, c);
    }
}