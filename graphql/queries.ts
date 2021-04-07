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