import React from 'react';
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { withRouter } from 'react-router';

const CandidateListComponent = (props) => {

    const handleVoteAction = (event) => {
        props.history.push("/vote");
    }

    const candidates = props.candidateList;
    var buttonDiv;
    if (props.showButton) {
        buttonDiv = <div className="text-left">
            <Button variant="primary" onClick={(e) => handleVoteAction(e)}>Cast Your Vote</Button>
        </div>
    }
    return (
        <div>
            <Table responsive bordered className="border-secondary" >
                <thead>
                    <tr>
                        <th className="border-secondary">Candidate Name</th>
                        <th className="border-secondary">Age</th>
                        <th className="border-secondary">Political Party</th>
                        <th className="border-secondary">Total Votes</th>
                    </tr>
                </thead>
                <tbody>
                    {candidates.length < 1 &&
                        <tr>
                            <td colSpan="4" className="text-center border-secondary">
                                No registered candidates found.
                       </td>
                        </tr>
                    }
                    {candidates.length > 0 &&
                        candidates.map(c =>
                            <tr key={c.id}>
                                <td className="border-secondary">
                                    <span>
                                        {c.name}
                                    </span>
                                </td>
                                <td className="border-secondary">
                                    <span>
                                        {c.age}
                                    </span>
                                </td>
                                <td className="border-secondary">
                                    <span>
                                        {c.politicalParty}
                                    </span>
                                </td>
                                <td className="border-secondary">
                                    <span>
                                        {c.totalVotes}
                                    </span>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </Table>
            {buttonDiv}
        </div>
    )
}

export default withRouter(CandidateListComponent);