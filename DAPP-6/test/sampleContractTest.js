const SampleContract = artifacts.require("SampleContract");
const D = artifacts.require("D");

contract("SampleContract", () => {
    let sContract = null;
    before(async () => {
        sContract = await SampleContract.deployed();
    });

    it('Sample Contract deployed', async () => {
        assert(sContract.address !== '');
    })
})

contract("D", () => {
    let d = null;
    before(async () => {
        d = await D.deployed();
    });

    it('D Contract deployed', async () => {
        assert(d.address !== '');
    })

    it('Should get computed result', async () => {
        await d.getComputedResult(5,5);
        const result = await d.getResult();
        assert(result.toNumber() == 10);
    })
})