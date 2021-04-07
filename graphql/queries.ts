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