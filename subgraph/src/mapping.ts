import { Applicant, Grant, Grantor, GrantRequest, Project } from '../generated/schema';
import { NewApplicant, NewGrant, NewGrantor, NewGrantRequest, NewProject, UpdateGrant, UpdateGrantRequest } from '../generated/Contract/Contract';

export function handleNewApplicant(event: NewApplicant): void {
    let applicant = new Applicant(event.params.id.toHex());

    applicant.name = event.params.name;
    applicant.phoneNumber = event.params.phoneNumber;
    applicant.emailAddress = event.params.emailAddress;
    applicant.physicalAddress = event.params.physicalAddress;
    
    applicant.save();
}

export function handleNewGrantor(event: NewGrantor): void {
    let grantor = new Grantor(event.params.id.toHex());

    grantor.agencyCode = event.params.agencyCode;
    grantor.agencyName = event.params.agencyName;

    grantor.save();
}

export function handleNewGrant(event: NewGrant): void {
    let grant = new Grant(event.params.id.toString());

    grant.name = event.params.name;
    grant.description = event.params.description;
    grant.amountInWei = event.params.amountInWei;
    grant.createdAt = event.params.createdAt;
    grant.deadlineTimestamp = event.params.deadlineTimeStamp;
    grant.status = event.params.grantStatus;

    grant.grantor = event.params.grantor.toHex();

    grant.save();
}

export function handleNewProject(event: NewProject): void {
    let project = new Project(event.params.id.toHex());

    project.name = event.params.name;
    project.description = event.params.description;

    project.owner = event.params.owner.toHex();

    project.save();
}

export function handleUpdateGrant(event: UpdateGrant): void {
    let grant = Grant.load(event.params.id.toString());

    grant.status = event.params.status;

    grant.save();
}

export function handleNewGrantRequest(event: NewGrantRequest): void {
    let request = new GrantRequest(event.params.id.toString());

    request.status = event.params.status;
    request.project = event.params.project.toHex();
    request.grant = event.params.grantId.toString();

    request.save();
}

export function handleUpdateGrantRequeset(event: UpdateGrantRequest): void {
    let request = GrantRequest.load(event.params.id.toString());

    request.status = event.params.status;

    request.save();
}