export enum Role {
    Grantor,
    Applicant
}

export enum GrantStatus{
    Posted,
    Closed
}

export enum RequestStatus {
    Created,
    Approved
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

export function toRequestStatusString(status: RequestStatus){
    switch(status) {
        case RequestStatus.Created:
            return 'Created';
        case RequestStatus.Approved:
            return 'Closed';
        default:
            throw new Error('Unknown status');
    }
}