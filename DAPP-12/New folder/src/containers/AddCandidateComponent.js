import React, { Component } from "react";
import { Button, Form, Jumbotron } from 'react-bootstrap';
import CandidateList from "../Components/CandidateList";
import getWeb3 from "../getWeb3";
import Voting from "../build/contracts/Voting.json";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SectionHeader from "../Components/sectionHeader";

class AddCandidateComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            contractInstance: null,
            account: '',
            candidateName: undefined,
            politicalParty: '',
            age: 0,
            candidateList: []
        };
        this.handleCandidateNameChange = this.handleCandidateNameChange.bind(this);
        this.capturePoliticalParty = this.capturePoliticalParty.bind(this);
        this.handleAddCandidate = this.handleAddCandidate.bind(this);
        this.captureAge = this.captureAge.bind(this);
        toast.configure({
            autoClose: 4000,
            draggable: false
        });
    }

    componentWillMount() {
        this.connectBlockchainState();
    }

    async connectBlockchainState() {
        // retrieve web3 object with active connection running on port
        const web3 = await getWeb3();
        //populate all the available accounts from local running blockchain
        const _accounts = await web3.eth.getAccounts();
        //get the network id of running blockchain
        const _networkId = await web3.eth.net.getId();
        //get deployed network based on network id for required contract
        const deployedNetwork = Voting.networks[_networkId];
        //generate contract instance based on contract address, abi, and web2 from deployed network
        const instance = new web3.eth.Contract(
            Voting.abi,
            deployedNetwork && deployedNetwork.address,
        );
        //Populate state object
        await this.setState({ contractInst: instance, account: _accounts[0] });
        //Load all the notarized documents
        this.loadCandidateList();
    }

    async loadCandidateList() {
        const { contractInst } = this.state;
        const _list = await contractInst.methods.getAllCandidates().call();
        this.setState({ candidateList: _list });
        if (this.props.location.hash !== "") {
            this._scrollToId(this.props.location.hash.substring(1));
        }
    }

    handleCandidateNameChange(event) {
        this.setState({ candidateName: event.target.value });
    }
    capturePoliticalParty(event) {
        this.setState({ politicalParty: event.target.value });
    }
    captureAge(event) {
        this.setState({ age: event.target.value });
    }
    async handleAddCandidate(event) {
        const { contractInst, account } = this.state;
        const _valid = this._validateCandidate();
        if (_valid) {
            await contractInst
                .methods
                .addCandidate(this.state.candidateName, this.state.politicalParty, this.state.age)
                .send({ from: account })
                .then(res => {
                    if (res && res.events) {
                        const _list = res.events.BroadcastAllCandidates.returnValues.candidates;
                        this.setState({ candidateList: _list });
                    }
                }).catch(err => {
                    console.error("---Error while adding candidates---", err);
                });
        }
    }

    _validateCandidate() {
        let isValid = true;
        this.state.candidateList.forEach((candidate) => {
            if (candidate.name.toLowerCase() === this.state.candidateName.toLowerCase()
                && candidate.age === this.state.age) {
                toast.error("Candidate already exists.");
                isValid = false;
            }
        });
        return isValid;
    }

    _scrollToId(id) {
        document.getElementById(id).scrollIntoView();
    }

    render() {
        return (
            <Jumbotron className="m-5 border-dark p-4">
                <SectionHeader header="Add Candidate"></SectionHeader>
                <Form className="pb-3" noValidate>
                    <Form.Group controlId="formGroupName">
                        <Form.Label>Candidate Name</Form.Label>
                        <Form.Control type="text"
                            placeholder="Enter name"
                            required
                            onChange={this.handleCandidateNameChange} />
                    </Form.Group>
                    <Form.Group controlId="formBasicAge">
                        <Form.Label required>Candidate Age</Form.Label>
                        <Form.Control type="number"
                            placeholder="Enter age"
                            min="21"
                            required
                            onChange={this.captureAge} />
                    </Form.Group>
                    <Form.Group controlId="formBasicPArty">
                        <Form.Label>Political Party</Form.Label>
                        <Form.Control as="select" name="politicalParty" onChange={this.capturePoliticalParty}
                            required>
                            <option value="">---None---</option>
                            <option value="AAP">AAP (Aam Admi Party)</option>
                            <option value="BJP">BJP (Bhartiya Janta Party)</option>
                            <option value="INC">INC (Indian National Congress)</option>
                            <option value="CPM">CPM (Communist)</option>
                            <option value="Other">Other (Independent)</option>
                        </Form.Control>
                    </Form.Group>
                    <Button variant="primary" type="button" onClick={this.handleAddCandidate}>
                        Submit
                    </Button>
                </Form>
                <div className="row border-top p-3 border-secondary" ></div>
                <SectionHeader header="Registered Candidates" ></SectionHeader>
                <div className="d-flex justify-content-left" id="result">
                    <CandidateList candidateList={this.state.candidateList} showButton="true"></CandidateList>
                </div>
            </Jumbotron>
        )
    }
}

export default AddCandidateComponent;