import { Applicant, Grantor } from '../generated/schema';
import { NewApplicant, NewGrantor } from '../generated/Contract/Contract';

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