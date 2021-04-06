import Link from "next/link";
import React from "react"
import { Table } from "semantic-ui-react"
import GrantOpportunity from "../models/GrantOppurtunity";
import { toGrantStatusString } from "../utils/enums";

interface IProps {
    data: any
}

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
        {props.data.map((item: any) => {
            return GrantOpportunity.parse(item);
        }).map((item: GrantOpportunity) => {
            return <Table.Row>
                <Table.Cell>
                        {item.id}
                </Table.Cell>
                <Table.Cell>
                    <Link href="/grants/[id]" as={`/grants/${item.id}`}>
                        {item.title}
                    </Link>
                </Table.Cell>
                <Table.Cell>{item.agency}</Table.Cell>
                <Table.Cell>{item.status}</Table.Cell>
                <Table.Cell>{item.createdAt.toDateString()}</Table.Cell>
                <Table.Cell>{item.closedAt.toDateString()}</Table.Cell>
            </Table.Row>
        })}
    </Table.Body>
  </Table>
}