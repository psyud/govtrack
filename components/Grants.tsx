import Link from "next/link";
import React from "react"
import { Table } from "semantic-ui-react"
import GrantOpportunity from "../models/GrantOppurtunities";

interface IProps {
    data: any
}

const data: GrantOpportunity[] = [
    new GrantOpportunity('DHS-21-DAD-024-00-04', 'Emergency Food and Shelter National Board Program (EFSP), pursuant to the American Rescue Plan Act of 2021, Section 4007', 'DHS-DHS', 'Posted', new Date('04/02/2021')),
    new GrantOpportunity('21JD01', 'Strategic Inmate Management Initiative', 'USDOJ-BOP-NIC', 'Posted', new Date('04/02/2021'), new Date('01/02/2021')),
    new GrantOpportunity('DHS-21-DAD-024-00-04', 'Emergency Food and Shelter National Board Program (EFSP), pursuant to the American Rescue Plan Act of 2021, Section 4007', 'DHS-DHS', 'Posted', new Date('04/02/2021')),
    new GrantOpportunity('21JD01', 'Strategic Inmate Management Initiative', 'USDOJ-BOP-NIC', 'Posted', new Date('04/02/2021'), new Date('01/02/2021')),
    new GrantOpportunity('DHS-21-DAD-024-00-04', 'Emergency Food and Shelter National Board Program (EFSP), pursuant to the American Rescue Plan Act of 2021, Section 4007', 'DHS-DHS', 'Posted', new Date('04/02/2021')),
    new GrantOpportunity('21JD01', 'Strategic Inmate Management Initiative', 'USDOJ-BOP-NIC', 'Posted', new Date('04/02/2021'), new Date('01/02/2021')),
    new GrantOpportunity('DHS-21-DAD-024-00-04', 'Emergency Food and Shelter National Board Program (EFSP), pursuant to the American Rescue Plan Act of 2021, Section 4007', 'DHS-DHS', 'Posted', new Date('04/02/2021')),
    new GrantOpportunity('21JD01', 'Strategic Inmate Management Initiative', 'USDOJ-BOP-NIC', 'Posted', new Date('04/02/2021'), new Date('01/02/2021')),
    new GrantOpportunity('DHS-21-DAD-024-00-04', 'Emergency Food and Shelter National Board Program (EFSP), pursuant to the American Rescue Plan Act of 2021, Section 4007', 'DHS-DHS', 'Posted', new Date('04/02/2021')),
    new GrantOpportunity('21JD01', 'Strategic Inmate Management Initiative', 'USDOJ-BOP-NIC', 'Posted', new Date('04/02/2021'), new Date('01/02/2021')),
    new GrantOpportunity('DHS-21-DAD-024-00-04', 'Emergency Food and Shelter National Board Program (EFSP), pursuant to the American Rescue Plan Act of 2021, Section 4007', 'DHS-DHS', 'Posted', new Date('04/02/2021')),
    new GrantOpportunity('21JD01', 'Strategic Inmate Management Initiative', 'USDOJ-BOP-NIC', 'Posted', new Date('04/02/2021'), new Date('01/02/2021')),
]

export default (props: IProps) => {
    return <Table size='small'>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Opportunity Number</Table.HeaderCell>
        <Table.HeaderCell>Opportunity Title</Table.HeaderCell>
        <Table.HeaderCell>Agency</Table.HeaderCell>
        <Table.HeaderCell>Opportunity Status</Table.HeaderCell>
        <Table.HeaderCell>Posted Date</Table.HeaderCell>
        <Table.HeaderCell>Close Date</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
        {data.map((item: GrantOpportunity) => {
            return <Table.Row>
                <Table.Cell>
                    <Link href="/grants/[id]" as={`/grants/${item.id}`}>
                        {item.id}
                    </Link>
                </Table.Cell>
                <Table.Cell>{item.title}</Table.Cell>
                <Table.Cell>{item.agency}</Table.Cell>
                <Table.Cell>{item.status}</Table.Cell>
                <Table.Cell>{item.createdAt.toDateString()}</Table.Cell>
                <Table.Cell>{item.closedAt?.toDateString()}</Table.Cell>
            </Table.Row>
        })}
    </Table.Body>
  </Table>
}