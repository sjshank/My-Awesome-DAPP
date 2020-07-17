const SampleContract = artifacts.require("SampleContract");

contract("SampleContract", () => {
    let sContract = null;

    before(async () => {
        sContract = await SampleContract.deployed();
    })

    it("Should deploy Sample Contract", () => {
        assert(sContract.address !== '');
    })

    it("Should set new ID", async () => {
        await sContract.setId(20);
        await sContract.setId(40);
        const result = await sContract.getId(0);
        //console.log(result.toString());
        assert(result.toNumber() === 20);
    })

    it("Should get asked ID", async () => {
        const result = await sContract.getId(1);
        assert(result.toNumber() === 40);
    })

    it("Should get all IDs", async () => {
        await sContract.setId(50);
        const result = await sContract.getAllId();
        const _ids = result.map(id => id.toNumber());
        assert.deepEqual(_ids, [20, 40, 50]);
    })

})