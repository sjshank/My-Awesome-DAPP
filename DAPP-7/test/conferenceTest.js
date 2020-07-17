const Conference = artifacts.require("Conference");


contract("Conference", accounts => {
    it("Should match initial quota", () =>
        Conference.deployed()
            .then(instance => instance.quota.call())
            .then(quota => {
                assert.equal(
                    quota.toNumber(),
                    200,
                    "It doesn't match initial quota 100"
                );
            }));

    it("Should match initial number of registrants", () =>
        Conference.deployed()
            .then(instance => instance.numberOfRegistrants.call())
            .then(noOfReg => {
                assert.equal(
                    noOfReg.toNumber(),
                    10,
                    "It doesn't match initial number of registrants 0"
                );
            }));

    it("Should have updated quota", () =>
        Conference.new({ from: accounts[1] })
            .then(instance => instance.changeQuota(400))
            .catch(err => {
                console.log(err.reason);
            }));

    it("Get the updated quota", () =>
        Conference.deployed()
            .then(instance => instance.quota.call())
            .then(quota => {
                assert.equal(
                    quota.toNumber(),
                    300,
                    "It doesn't match updated quota 400"
                );
            }));

    it("Buy ticket from organizer", () =>
        Conference.deployed()
            .then((instance) =>{
                instance.buyTicket(200);
            })
            .catch(err => {
                console.log(err.reason);
            }));

    it("Should get the updated number of registrants", () =>
        Conference.deployed()
            .then(instance => instance.numberOfRegistrants.call())
            .then(noOfReg => {
                assert.equal(
                    noOfReg.toNumber(),
                    7,
                    "It doesn't match updated number of registrants 1"
                );
            }));
});