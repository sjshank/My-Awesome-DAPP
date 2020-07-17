const SampleContract = artifacts.require("SampleContract");

contract('SampleContract', ()=>{
    let sContract = null;
    before(async ()=>{
        sContract = await SampleContract.deployed();
    });

    it("Sample Contract deployed", async ()=>{
        sContract = await SampleContract.deployed();
        assert(sContract.address !== '');
    })

    it("Default data string", async ()=>{
        sContract = await SampleContract.deployed();
        assert(sContract.getData(), 'Default');
    })
})