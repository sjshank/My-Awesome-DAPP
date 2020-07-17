const SampleContract = artifacts.require("SampleContract");

contract('SampleContract', () => {
    it('Should deploy sample contract', async () => {
        const sContract = await SampleContract.deployed();
        assert(sContract.address != '');
    });

    it('Should add 2 numbers', async () => {
        const sContract = await SampleContract.deployed();
        const result = await sContract.addTwoNumbers(1, 2);
        assert(result.toNumber() == 3);
    })

    it('Should add 3 numbers', async () => {
        const sContract = await SampleContract.deployed();
        const result = await sContract.addThreeNumbers(2,5,6);
        assert(result.toNumber() == 13);
    })

})