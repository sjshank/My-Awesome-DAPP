pragma solidity ^0.5.4;


// @title - Name of contract
contract LearningContract {
    //State variable - string datatype
    string value;

    //Public visibility - to make state variale publically visible
    // and solidity creates getter function to retrieve value. Hence, no need to
    // create custom getter function.
    // Also, no longer need to set value inside construtor.
    string public strValue = "Default string";

    // Boolean datatype
    bool public boolValue = false;

    // Unsigned integer datatype
    uint256 public uintValue = 1;

    // signed integer datatype
    int256 public count = 0;

    //Getter function for retrieving value string
    //public - so that function can be called from outisde of contract
    //returns - indicates function will return specific datatype
    //view - since function is reading state variable not writing
    function get() public view returns (string) {
        return value;
    }

    function set(string _value) public {
        value = _value;
    }

    /*
     *   Enum datatype
     */
    // Keep a track of enumeratedList
    enum State {Waiting, Ready, Active}
    State public myState;

    //public - so that function can be called from outisde of contract while inheriting
    constructor() public {
        value = "Default value";
        myState = State.Waiting; // Set the default state
    }

    //Update the current state
    function setActiveState() public {
        myState = State.Active;
    }

    //Verify the current updated state
    function isActive() public view returns (bool) {
        return myState == State.Active;
    }

    /*
     *   Define own datatypes with Structs
     */
    struct Person {
        uint256 _id;
        string _fName;
        string _lName;
    }

    /*
     *   Array to store list of any specified datatype items.
     *   WOrked with struct dataype as well
     */
    //Dynamic array of Struct Person datatype
    Person[] public people;

    //Function to add person inside People array
    function addPerson(string memory _fName, string memory _lName) public {
        people.push(Person(_fName, _lName)); // Push method in array to add new struct data object inside array
    }

    /*
     *   Mapping Acts like Associated arrar or hash table
     */
    //Key - unsigned integer
    //Value - Person struct object
    mapping(uint256 => Person) public PeopleMap;

    //Function to add person inside People array
    function populatePeopleMap(string memory _fName, string memory _lName)
        public
    {
        people.push(Person(_fName, _lName));
        PeopleMap[people.length - 1] = people[people.length - 1];
    }

    //Function to increment count
    //internal - function visibility inside contract
    function incrementCount() internal {
        count += 1;
    }

    function addNewPerson(string memory _fName, string memory _lName) public {
        incrementCount();
        PeopleMap[count] = Person(count, _fName, _lName);
    }
}


/*
 *   Modifier
 */
contract ModifierContract {
    //Address - holds 20 bytes. No arthmetic operation.
    address owner;

    uint256 count = 0;
    /*
     *   Define own datatypes with Structs
     */
    struct Person {
        uint256 _id;
        string _fName;
        string _lName;
    }
    mapping(uint256 => Person) public people;

    constructor() public {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        //require - allow to check condition
        //message - Throws error message when condition fails
        require(msg.sender == owner, "Only owner has access");
        _; //If above condition met then it will allow to execute remaining code
    }

    function addPerson(string memory _firstName, string memory _lastName)
        public
        onlyOwner
    {
        count += 1;
        people[count] = Person(count, _firstName, _lastName);
    }
}


/*
 *   Usage of Ether and Events
 */

contract TokenContract {
    //Keep track of address holding token balances
    mapping(address => uint256) public balances;

    //Address Payable - it allow to send ether
    address payable wallet;

    //set the wallet address inside constructor. probably contract address.
    constructor(address payable _wallet) public {
        wallet = _wallet;
    }

    //function to buy token and update token balances mapping
    //Payable - Must use in order account to send Ether
    function buyToken() public payable {
        balances[msg.sender] += 1; //msg.sender - Global object 'msg' that holds sender's address
        wallet.transfer(msg.value); //msg.value - Global object 'msg' that holds value send by sender
    }

    //Function marked external -  Commion pattern in ICO whenever ether sends to smart contract
    // external function gets executed. Over here it will call buyToken and execute logic
    function() external payable {
        buyToken();
    }

    //Events - Used to deal with async nature of blockchain
    //Blockchain takes some time to execute transaction and events helps to notify external
    //consumers when transactio is completed
    //Indexed - used to listen event only relevant to our account
    event Purchase(address indexed _buyer, uint256 _amount);

    //Buy token function - Buy token for msg.sender using amount send by sender in msg.value
    //Transfer that ether into wallet using transfer emthod and populate balances
    //Then fire event to notify consumers
    function buyToken() public payable {
        balances[msg.sender] += 1;
        wallet.transfer(msg.value);
        emit Purchase(msg.sender, msg.value); //Emit event
    }
}
