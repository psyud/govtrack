import { Applicant } from '../generated/schema';
import { NewApplicant } from '../generated/Contract/Contract';

export function handleNewApplicant(event: NewApplicant): void {
    let applicant = new Applicant(event.params.id.toHex());
    applicant.name = event.params.name;
    
    applicant.save();
}
