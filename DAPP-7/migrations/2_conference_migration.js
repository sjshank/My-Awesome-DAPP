const Conference = artifacts.require("Conference");

module.exports = function(deployer) {
  deployer.deploy(Conference);
};
