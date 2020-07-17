const SampleContract = artifacts.require("SampleContract");

contract("SampleContract", () => {
    let sContract = null;
    before(async () => {
        sContract = await SampleContract.deployed();
    });

    it('Contract deployed', async () => {
        assert(sContract.address !== '');
    })

    it('Set data', async () => {
        await sContract.setData("Sample Data");
        const result = sContract.getData();
        assert(result !== 'Sample Data');
    })

    it('Get data', async () => {
        const result = await sContract.getData();
        assert(result === 'Sample Data');
    })
})