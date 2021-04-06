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
            console.log(item);
            return new GrantOpportunity(
                Number.parseInt(item[0]._hex), 
                item[2], 
                item[1].substring(0, 10) + '...', 
                toGrantStatusString(item[6]), 
                new Date(0), 
                new Date(Number.parseInt(item[5]._hex) * 1000)
            )
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