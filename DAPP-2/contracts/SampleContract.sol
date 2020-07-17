pragma solidity ^0.5.4;

contract SampleContract{
    // String declaration with public keyword. It will by default create getter function
    string public data = 'Default';

    // public function to retreive string.
    // view - use when function only reading state variable and processing local variable
    // returns - to specify return type
    function getData() public view returns(string memory){
        return data;
    }
}