pragma solidity ^0.5.4;


/*
 * @Title contract name
 * @dev - Contract will keep a track of todo list
 */
contract TodoList {
    //State variable, public access
    //Any data that we store inside this state variable is written to storage on the blockchain.
    //It changes the smart contract's state, and has scope within the entire smart contract
    uint256 public taskCount = 0; //Set default value

    //Task model to list out array of task. Use struct for creating custom task modal
    struct Task {
        uint256 id;
        string content;
        bool completed;
    }

    //To map all the task
    //Mapping -> Act like associated array that will hold unique id and Tasl struct object
    mapping(uint256 => Task) public taskList;

    //Constructor to perform initial operation on contract creation. It will get call only once.
    constructor() public {
        createTask("This is a default task created on contract initialize");
    }

    //Event declaration
    //Trigger this event to notify client side once task has been created
    event TaskCreated(uint256 id, string content, bool completed);

    //Trigger this event to notify client side once task has been completed
    event TaskStatus(uint256 id, bool completed);

    //Fucntion to create task and populate taskList
    //Require - condition to check content is not empty or else throw message
    // memory - to persist content input into memory location
    function createTask(string memory _content) public {
        require(bytes(_content).length > 0, "Content should not be empty");
        taskCount++;
        taskList[taskCount] = Task(taskCount, _content, false);
        //Emit event
        emit TaskCreated(taskCount, _content, false);
    }

    //Fucntion to mark task as completed
    //Require - condition to check content is not empty or else throw message
    // memory - to persist content input into memory location
    //Emit event once task completed and notify client side
    function toggleStatus(uint256 _id, bool _status) public {
        require(_id >= 0, "Task Id must be positive");
        Task memory _task = taskList[_id];
        _task.completed = _status;
        taskList[_id] = _task;
        emit TaskStatus(_id, _task.completed);
    }
}
