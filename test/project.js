const { GovTrack, expect } = require('./base');

contract("Project Creation", accounts => {
    it("Create a project", async() => {
        const applicant = accounts[0];
        const project = accounts[1];
        const projectName = 'project_name';
        const inst = await GovTrack.deployed();

        await inst.registerAsApplicant('name', { from: applicant });
        await inst.createProject(project, projectName, { from: applicant });

        const deployedProject = await inst.addressToProject(project);

        expect(deployedProject.id).to.equal(project);
        expect(deployedProject.owner).to.equal(applicant);
        expect(deployedProject.name).to.equal(projectName);
    })
})

contract("Project Creation Exceptions", accounts => {
    it("Cannot create a project if sender is not registered as an applicant", async () => {
        const applicant = accounts[0];
        const project = accounts[1];
        const inst = await GovTrack.deployed();

        try {
            await inst.createProject(project, 'something', { from: applicant });
        }catch(e) {
            expect(e.message).to.contain('You have not registered as an applicant');
        }
    })

    it("Cannot create a project twice", async () => {
        const applicant = accounts[0];
        const project = accounts[1];
        const inst = await GovTrack.deployed();

        await inst.registerAsApplicant('name', { from: applicant });
        await inst.createProject(project, 'something', { from: applicant });

        try {
            await inst.createProject(project, 'something', { from: applicant });
        }catch(e) {
            expect(e.message).to.contain('Project has been registered');
        }
    })
})