pragma solidity >=0.5.0 <0.7.0;
pragma experimental ABIEncoderV2;


contract Voting {
    struct Candidate {
        uint256 id; // Auto generated uint256 id
        string name; // Name of candidate
        string politicalParty; // political party name
        uint8 age; // age of candidate
        uint256 totalVotes;
    }
    mapping(string => uint256) voters;
    Candidate[] public candidateList;

    event BroadcastAllCandidates(Candidate[] candidates);
    event BroadcastVoteResult(bool flag, Candidate[] candidates);

    constructor(
        string memory _candidateName,
        string memory _politicalParty,
        uint8 _age
    ) public {
        Candidate memory c = Candidate(
            generateId(_candidateName, _politicalParty),
            _candidateName,
            _politicalParty,
            _age,
            0
        );
        candidateList.push(c);
    }

    function getTotalVotesForCandidate(string memory _candidateName)
        public
        view
        returns (uint256)
    {
        require(validCandidate(_candidateName), "Candidate is not valid.");
        return voters[_candidateName];
    }

    function voteForCandidate(string memory _candidateName) public payable {
        require(validCandidate(_candidateName), "Candidate is not valid.");
        voters[_candidateName] += 1;
        for (uint256 i = 0; i <= candidateList.length - 1; i++) {
            candidateList[i].totalVotes = voters[candidateList[i].name];
        }
        emit BroadcastVoteResult(true, candidateList);
    }

    function addCandidate(
        string memory _candidateName,
        string memory _politicalParty,
        uint8 _age
    ) public payable {
        require(!validCandidate(_candidateName), "Candidate is already exist.");
        Candidate memory c = Candidate(
            generateId(_candidateName, _politicalParty),
            _candidateName,
            _politicalParty,
            _age,
            0
        );
        candidateList.push(c);
        emit BroadcastAllCandidates(candidateList);
    }

    function getAllCandidates() public view returns (Candidate[] memory) {
        return candidateList;
    }

    function validCandidate(string memory _name) public view returns (bool) {
        for (uint256 i = 0; i <= candidateList.length - 1; i++) {
            if (
                keccak256(abi.encodePacked(candidateList[i].name)) ==
                keccak256(abi.encodePacked(_name))
            ) {
                return true;
            }
        }
        return false;
    }

    function generateId(
        string memory _candidateName,
        string memory _politicalParty
    ) internal pure returns (uint256) {
        return
            uint256(
                keccak256(abi.encodePacked(_candidateName, _politicalParty))
            );
    }
}
