const SampleContract = artifacts.require("SampleContract");
const D = artifacts.require("D");

module.exports = function (deployer) {
  deployer.deploy(SampleContract).then(()=>{
        return deployer.deploy(D);
  });
};
