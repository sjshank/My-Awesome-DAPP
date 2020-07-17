import React, { Component } from "react";
import { Button, Form, Jumbotron, Col } from 'react-bootstrap';
import getWeb3 from "../getWeb3";
import Voting from ".././build/contracts/Voting.json";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CandidateList from "./CandidateList";
import SectionHeader from "./sectionHeader";

class VotingComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            contractInstance: null,
            account: '',
            candidateName: undefined,
            candidateList: [],
            hasCastedVote: true,
            voteSubmitted : false
        };
        this.castYourVoteAction = this.castYourVoteAction.bind(this);
        this.captureCandidateName = this.captureCandidateName.bind(this);
        toast.configure({
            autoClose: 4000,
            draggable: false
        });
    }

    componentDidMount() {
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
    }

    async castYourVoteAction() {
        const { contractInst, account } = this.state;
        await contractInst
            .methods
            .voteForCandidate(this.state.candidateName)
            .send({ from: account })
            .then(res => {
                if (res && res.events) {
                    const _result = res.events.BroadcastVoteResult.returnValues;
                    if (_result.flag === true) {
                        this.setState({ hasCastedVote: true });
                        this.setState({ voteSubmitted: true });
                        toast.success("Thank you ! Your vote has been counted successfully.");
                        this.setState({ candidateList: _result.candidates });
                    }
                }
            }).catch(err => {
                console.error("---Error while adding candidates---", err);
            });

    }

    captureCandidateName(event) {
        this.setState({ candidateName: event.target.value });
        if(!event.target.value || event.target.value === ''){
            this.setState({ hasCastedVote: true }); 
        }else{
            this.setState({ hasCastedVote: false }); 
        }
    }
    navigateBackToHome(){
        this.props.history.replace("/#result");
    }

    render() {
        const candidates = this.state.candidateList;
        var tableSection;
        if (this.state.voteSubmitted) {
            tableSection = <div className="d-flex justify-content-left pt-3">
                <CandidateList candidateList={this.state.candidateList} showButton={!this.state.hasCastedVote}></CandidateList>
            </div>;
        } else {
            tableSection = "";
        }

        return (
            <Jumbotron className="m-5 border-dark p-4">
                <SectionHeader header="Cast Your Vote"></SectionHeader>
                <Form className="pt-2">
                    <Form.Row>
                        <Col>
                            <Form.Group controlId="formBasicCandidate">
                                <Form.Label>Please select candidate and cast your vote</Form.Label>
                                <Form.Control as="select" onChange={this.captureCandidateName}
                                    required>
                                    <option value="">---Choose Candidate---</option>
                                    {candidates.length > 0 &&
                                        candidates.map(c =>
                                            <option key={c.id} value={c.name}>{c.name}</option>
                                        )
                                    }
                                </Form.Control>
                            </Form.Group>
                        </Col>
                    </Form.Row>
                    <Button variant="primary" disabled={this.state.hasCastedVote} type="button" onClick={this.castYourVoteAction}>
                        Vote
                    </Button>
                    {this.state.voteSubmitted &&
                        <Button variant="primary" className="ml-2" type="button" onClick={()=>this.navigateBackToHome()}>
                            Back to Home
                    </Button>}
                </Form>
                {tableSection}
            </Jumbotron>
        )
    }
}

export default VotingComponent;