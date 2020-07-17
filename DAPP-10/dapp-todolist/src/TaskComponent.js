import React, { Component } from 'react';
//Import required smart contracts
import TodoListContract from "./contracts/TodoList.json";
//Import web3 file 
import getWeb3 from './getWeb3';
import { Button, Form } from 'react-bootstrap';

/*
*   Task component to load web3, connect blockchain, task list and render list
*/
class TaskComponent extends Component {
    /*
    *   Constructor to initialize state, bind html events
    */
    constructor(props) {
        super(props);
        //State
        this.state = {
            contractInst: '', // hold contract instance
            account: '', // hold eth account
            taskList: [], // list of task
            contentValue: '' // input text value
        };
        this.handleAdd = this.handleAdd.bind(this); // bind add event
        this.handleInputChange = this.handleInputChange.bind(this); // bind text box input change event
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this); // bind checkbox change event
    }

    /*
    *   React component lyf cycle method to perform init actions once component starts mounting
    */
    componentWillMount() {
        // function to load web3 and connect local blockchain development network
        this.connectBlockchain();
    }

    async connectBlockchain() {
        // retrieve web3 object with active connection running on port
        const web3 = await getWeb3();
        //populate all the available accounts from local running blockchain
        const _accounts = await web3.eth.getAccounts();
        //get the network id of running blockchain
        const _networkId = await web3.eth.net.getId();
        //get deployed network based on network id for required contract
        const deployedNetwork = TodoListContract.networks[_networkId];
        //generate contract instance based on contract address, abi, and web2 from deployed network
        const instance = new web3.eth.Contract(
            TodoListContract.abi,
            deployedNetwork && deployedNetwork.address,
        );
        //Populate state object
        await this.setState({ contractInst: instance, account: _accounts[0] });
        //load the task list
        this.populateList();
    }

    /*
    *   function to load task list and set state object with task list
    */
    async populateList() {
        var _taskList = [];
        //retrieve required variables from state
        const { contractInst, account } = this.state;
        //get the the task count by calling taskCount method provided by smart contract
        const _taskcount = await contractInst.methods.taskCount().call();
        //loop tasklist till taskcount and retrieve task object calling taskList method
        for (let i = 1; i <= _taskcount; i++) {
            const _taskRecord = await contractInst.methods.taskList(i).call();
            _taskList.push(_taskRecord);
        }
        //set the state object with tasklist
        this.setState({ taskList: _taskList });
    }

    /*
    *   handler for input text change
    */
    handleInputChange(event) {
        event.preventDefault();
        //set the contentValue on input change
        this.setState({ contentValue: event.target.value });
    }

    /*
    *   handler for creating task
    */
    handleAdd(event) {
        event.preventDefault();
        //retrieve required variables from state
        const { contractInst, account, taskList, contentValue } = this.state;
        //make a call to smart contract createTask with required params to create new task.
        // Since, it's going to change state of blockchain hence it requires account
        contractInst.methods.createTask(contentValue).send({ from: account })
            .then(res => {
                //process the response and update the list with newly created task
                //Since method is emitting event hence capture that event using 'events' object
                const result = res.events.TaskCreated.returnValues;
                taskList.push({
                    'id': result.id,
                    'content': result.content,
                    'completed': result.completed,
                });
                //set the state with updated task list
                this.setState({ taskList: taskList });
            }).catch(err => {
                alert("Error while adding task");
            })
    }

    /*
    *   Handler for checkbox change
    */
    async handleCheckboxChange(event) {
        //retrieve required variables from state
        const { contractInst, account, taskList } = this.state;
        //make a call to smart contract toggleStatus with required params to updated task status
        // Since, it's going to change state of blockchain hence it requires account
        contractInst.methods.toggleStatus(event.target.id, event.target.checked).send({ from: account })
            .then(res => {
                //process the response and update the list with newly created task
                //Since method is emitting event hence capture that event using 'events' object
                const result = res.events.TaskStatus.returnValues;
                taskList.forEach(task => {
                    if (parseInt(task.id) === result.id) {
                        task.completed = result.completed;
                    }
                })
                //set the state with updated task list
                this.setState({ taskList: taskList });
            }).catch(err => {
                alert("Error while updating task status");
            })

    }


    render() {
        return (
            <div className="container">
                <header>
                    <h2 className="p-2 bd-highlight">Hello Blockchain Learner !</h2>
                </header>
                <section>
                    <div>
                        <ul className="d-flex">
                            <li className="pr-2 input-box-li"><Form.Control type="text"
                                placeholder="Enter content here"
                                className=""
                                onChange={this.handleInputChange}
                                value={this.state.contentValue}
                            /></li>
                            <li><Button variant="primary" onClick={this.handleAdd}>Add</Button></li>
                        </ul>
                    </div>
                    <div className="">
                        {this.state.taskList.map(t =>
                            <ul key={t.id} className="d-flex">
                                <li className="li-class">
                                    <input type="checkbox"
                                        name="checkbox"
                                        defaultChecked={t.completed}
                                        id={t.id}
                                        onChange={this.handleCheckboxChange} />
                                    <span className="pl-2">{t.content}</span>
                                </li>
                            </ul>
                        )}
                    </div>
                </section>
                <footer class="mt-4">
                    <p class="text-center">Happy Learning. <a href="https://github.com/sjshank">Saurabh Shankariya</a></p>
                </footer>
            </div>

        )
    }
}

export default TaskComponent;