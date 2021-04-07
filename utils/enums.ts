export enum Role {
    Grantor,
    Applicant
}

export enum GrantStatus{
    Posted,
    Closed
}

export function toGrantStatusString(status: GrantStatus){
    switch(status){
        case GrantStatus.Posted:
            return 'Posted';
        case GrantStatus.Closed:
            return 'Closed';
        default:
            throw new Error('Unknown status');
    }
}
