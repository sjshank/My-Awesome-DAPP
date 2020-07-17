pragma solidity ^0.5.4;


contract Conference {

    // Address datatype to store 20bytes data. No arthemetic operations
    address payable public owner; //It is marked as 'payable' to manage ethers(transfer, call, send)
    // Mapping of any datatype with any type
    mapping(address => uint256) public registrants;
    // to store integer value
    uint256 public numberOfRegistrants;
    // to store integer value
    uint256 public quota;

    // Event declaration for amount deposit
    event Deposit(address _from, uint256 _amount);

    //Constructor for initializing state variables
    constructor() public {
        owner = msg.sender;
        quota = 100;
        numberOfRegistrants = 0;
    }

    // Modifier to check whether sender is owner
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner has rights");
        _;
    }

    // Public function along with modifier to change quota
    function changeQuota(uint256 newQuota) public payable onlyOwner {
        quota = newQuota;
    }

    // Modifier to check number of registrants is less than quota
    modifier numberOfRegistrantsChecker() {
        require(
            numberOfRegistrants < quota,
            "Number of registration should be less than quota"
        );
        _;
    }

    // Public function to buy ticket and emit deposit event
    function buyTicket(uint256 _ticketPrice) public numberOfRegistrantsChecker {
        registrants[msg.sender] = _ticketPrice; //Add buyer detail
        numberOfRegistrants++;
        emit Deposit(msg.sender, _ticketPrice); //Emit event
    }

    function destroy() public onlyOwner {
        selfdestruct(owner);
    }
}
