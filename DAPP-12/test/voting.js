const Voting = artifacts.require("Voting");

contract("Voting", function () {


  it("should assert true", async function () {
    this.voting = await Voting.deployed();
    assert(this.voting.address != '');
  });


  it("Add and verify candidate", async function () {
    await this.voting.addCandidate("Saurabh");
    const candidate = await this.voting.candidateList(1);
    assert(candidate == 'Saurabh');
  });

  it("Should not allow duplicate addition of candidate", async function () {
    this.voting.addCandidate("Saurabh");
    this.voting.addCandidate("Saurabh");
  });

  it("Should caste your vote only to valid candidates", async function () {
    const result = await this.voting.voteForCandidate("Saurabh");
    this.voting.voteForCandidate("xyz")
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        assert(err.reason == 'Candidate is not valid');
      });
  });

  it("Should retrieve number of votes casted to only valid candidate", async function () {
    const result = await this.voting.getTotalVotesForCandidate("Saurabh");
    assert(result.toNumber() == 1);
    this.voting.getTotalVotesForCandidate("xyz")
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        assert(err.reason == 'Candidate is not valid');
      });
  });
});
