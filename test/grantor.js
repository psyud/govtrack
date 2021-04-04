const { GovTrack, expect } = require('./base');

contract("Grantor Registration", accounts => {
    it("Register as a grantor", async () => {
        const grantor = accounts[0];
        const inst = await GovTrack.deployed();

        await inst.registerAsGrantor('Department of Meme', 'DOM', { from: grantor });
      
        const deployedGrantor = await inst.addressToGrantor(grantor);
        
        expect(deployedGrantor.id).to.equal(grantor);
        expect(deployedGrantor.agencyName).to.equal('Department of Meme');
        expect(deployedGrantor.agencyCode).to.equal('DOM');
        expect(deployedGrantor.isRegistered).to.be.true;
    })
})


contract("Grantor Registration Exceptions", accounts => {
    it("Cannot register as a grantor more than once", async () => {
        const inst = await GovTrack.deployed();
        await inst.registerAsGrantor('name 1', '', { from: accounts[0] });

        try {
            await inst.registerAsGrantor('name 2', '', { from: accounts[0] });
        }catch(e) {
            expect(e.message).to.contain("You already registered as a grantor");
        }
    })
})