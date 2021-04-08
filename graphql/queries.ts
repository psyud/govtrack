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
        projects(owner: $applicantId){
            id,
            name,
            description,
            grantRequest {
                id
                status
                grant {
                    name
                    status
                }
            }
        }
    }
`

export const GET_PROJECT_BY_ID = gql`
    query getProjectById($projectId: ID!) {
        project(id: $projectId) {
            id,
            name,
            description,
            grantRequest {
                id
                grant {
                    id
                    grantor {
                        id
                        agencyCode
                        agencyName
                    }
                    name
                    description
                    amountInWei
                    status
                    createdAt
                    deadlineTimestamp
                }
            }
        }
    }
`

export const GET_GRANT_REQUESTS_FOR_GRANT = gql`
query getGrantRequestsForGrant($grantId: ID!) {
        grant(id: $grantId) {
            grantRequests(grant: $grantId) {
                id
                project {
                    id,
                    name,
                    description,
                    owner {
                        name
                    }
                }
                status
            }
        }
    }
`