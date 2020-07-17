const SampleContract = artifacts.require("SampleContract");

contract('SampleContract', () =>{
    it('It should display Sample contract', async () =>{
        const sampleContract = await SampleContract.deployed();
        assert(sampleContract.address !== '');
    });
});