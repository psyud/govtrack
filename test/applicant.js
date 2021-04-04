const { GovTrack, expect } = require('./base');

contract("Applicant Registration", accounts => {
    it("Register as an applicant", async () => {
        const applicant = accounts[0];
        const applicantName = "Mom's spaghetti";
        const inst = await GovTrack.deployed();

        await inst.registerAsApplicant(applicantName, '0123', 'x@y.z', 'addr', { from: applicant });

        const deployedApplicant = await inst.addressToApplicant(applicant);
        
        expect(deployedApplicant.id).to.equal(applicant);
        expect(deployedApplicant.name).to.equal(applicantName);
        expect(deployedApplicant.phoneNumber).to.equal('0123');
        expect(deployedApplicant.emailAddress).to.equal('x@y.z');
        expect(deployedApplicant.physicalAddress).to.equal('addr');
        expect(deployedApplicant.isRegistered).to.be.true;
    })
})


contract("Applicant Registration Exceptions", accounts => {
    it("Cannot register as an applicant more than once", async () => {
        const inst = await GovTrack.deployed();

        await inst.registerAsApplicant('name 1', '', '', '', { from: accounts[0] });

        try {
            await inst.registerAsApplicant('name 2', '', '', '', { from: accounts[0] });
        }catch(e) {
            expect(e.message).to.contain("You already registered as an applicant");
        }
    })
})