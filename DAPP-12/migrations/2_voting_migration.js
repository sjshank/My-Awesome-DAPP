const Voting = artifacts.require("Voting");

module.exports = function(deployer) {
  deployer.deploy(Voting, "Proxy Candidate", "BJP", 30);
};
