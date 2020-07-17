/*const PetAdoption = artifacts.require("PetAdoption");


contract("PetAdoption", accounts => {
    it("Should match initial quota", () =>
    PetAdoption.deployed()
            .then(instance =>  instance.adoptPet("Cat", "Saurabh"))
            .then(result => {
                console.log("---res---", result);
            }));
});*/


const PetAdoption = artifacts.require("PetAdoption");

contract('PetAdoption', ()=>{
    let pContract = null;
    before(async ()=>{
        pContract = await PetAdoption.deployed();
    });

    it("Adoption Contract deployed",  ()=>{
        assert(pContract.address !== '');
    })

    it("Default data string", async ()=>{
       const res = await pContract.adoptPet("Cat", "Saurabh");
       res.then(function(result){
        console.log(result);
       });
    })
})