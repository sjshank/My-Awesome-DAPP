import React, { Component } from "react";
import { Button, Navbar } from 'react-bootstrap';
import { Link, withRouter } from "react-router-dom";

class HeaderComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.handleVoteAction = this.handleVoteAction.bind(this);
    }

    handleVoteAction(event) {
        this.props.history.push("/vote");
    }

    render() {
        return (
            <header>
                <div className="bg-dark clearfix">
                    <div className="float-left">
                        <Navbar.Brand className="text-white p-2 pl-5">
                            <Link to="/" exact="true" ><h3>Voting Portal</h3></Link>
                        </Navbar.Brand>
                    </div>
                    <div className="float-right">
                        {this.props.location.pathname !== '/vote' &&
                        <Button variant="primary" className="text-white m-2 mr-5" onClick={this.handleVoteAction} >Cast Your Vote</Button>}
                    </div>
                </div>
            </header>
        )
    }
}

export default withRouter(HeaderComponent);