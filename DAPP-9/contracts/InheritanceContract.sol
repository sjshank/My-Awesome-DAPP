pragma solidity ^0.5.4;


/***** THE BELOW EXAMPLE TELLS ABOUT INTERACTION BETWEEN 2 CONTRACTS WITH THE
        HELP OF PARENT CONTRACT ADDRESS WHICH ALLOWS TO CALL ALL IT"S METHOD
 */

/*  @title Pseudo ERC20 Token contract
 */
contract ERC20Token {
    string name;
    mapping(address => uint256) public balances;

    //Mint - logic written to min the balance at time to buying token
    //Will be used by derived contract
    function mint() public {
        balances[tx.origin] += 1; // tx.origin - it will refer the account that originated transaction.
        //msg.sender - will hold contract address
    }
}


/*
    Derived contract
*/
contract TokenBuyer {
    //Address - 20 bytes data;
    address public token; // It will hold address of deployed smart contract ERC20Token

    address payable wallet; // Holds address of wallet to transfer ether

    /*  Other way to utilize token contract reference
     */
    // ERC20Token public token

    constructor(address payable _wallet, address _token) public {
        wallet = _wallet;
        token = _token;
    }

    function buyToken() public payable {
        ERC20Token _token = ERC20Token(address(token)); //it will populate the ERC20Token contract reference and then we can call 'min' method.
        //The other way to call mint method of token contract by defining token conttract at top and accessing it's method here
        /*
         *   token.min();
         */
        _token.mint();
        wallet.transfer(msg.value);
    }
}


/***** HOW IT WILL WORK IN REMIX */
/* You will need to deploy the token smart contract first, obtain its address,
and then include it as an argument whenever you deploy the second smart contract */

/*-----------------------------------------------------------------------------------------*/

/***** THE BELOW EXAMPLE TELLS ABOUT INTERACTION BETWEEN 2 CONTRACTS WITH THE
        HELP OF INHERITANCE
 */

contract ERC20TokenContract {
    string public name;
    mapping(address => uint256) public balances;

    //To keep a track of token name
    constructor(string memory _name) public {
        name = _name;
    }

    function mint() public {
        balances[tx.origin]++;
    }
}


//MyCOntract inheriting ERC20TokenContract
contract MyContract is ERC20TokenContract {
    address[] public tokenOwners;

    //Calling parent contract constructor with parameter
    constructor(string _name) public ERC20TokenContract(_name){}

    //Update above value inside child contract mint method
    //while preserving parent mint method and execute base logic of parent mint method
    //using 'super' keyword
    function mint() public {
        super.mint();
        tokenOwners.push(msg.sender);
    }
}
