import { gql } from '@apollo/client';

export const GET_GRANTS = gql`
    query getGrants {
        grants {
            id
            name
            grantor {
                agencyName
            }
            createdAt
            deadlineTimestamp
            amountInWei
            status
        }
    }
`
export const GET_GRANT_BY_ID = gql`
    query getGrantById($grantId: ID!) {
        grant(id: $grantId) {
            id,
            name,
            description,
            amountInWei,
            createdAt,
            deadlineTimestamp,
            status,

            grantor {
                agencyCode
                agencyName
            }
        }
    }
`

export const GET_GRANTOR_BY_ID = gql`
    query getGrantorById($grantorId: ID!) {
        grantor(id: $grantorId) {
            id,
            agencyName,
            agencyCode,
            grants {
                id,
                name,
                amountInWei,
                createdAt,
                deadlineTimestamp,
                status,
                
                grantor {
                    agencyName
                }
            }
        }
    }
`
export const GET_APPLICANT_PROJECTS = gql`
    query getApplicantProjects($applicantId: ID!) {
        projects(ownerId: $applicantId){
            id,
            name,
            description,
            grantRequest
        }
    }
`

export const GET_GRANT_REQUESTS_FOR_PROJECT = gql`
    query getGrantRequestsForProject($projectId: ID!) {
        grantRequests(project: $projectId) {
            grant {
                id,
                name,
                description,
                amountInWei,
                createdAt,
                deadlineTimestamp,
                status,
                grantor {
                    agencyName,
                    agencyCode
                }
            }
            status
        }
    }
`