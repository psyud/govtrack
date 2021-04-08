import moment from "moment";
import Link from "next/link";
import React from "react"
import { Table } from "semantic-ui-react"
import Grant from "../models/Grant";
import { DATE_FORMAT } from "../utils/constants";

interface IProps {
    grants: Grant[]
}

export default function (props: IProps) {
    return <Table size='small'>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Opportunity Number</Table.HeaderCell>
        <Table.HeaderCell>Opportunity Title</Table.HeaderCell>
        <Table.HeaderCell>Agency</Table.HeaderCell>
        <Table.HeaderCell>Opportunity Status</Table.HeaderCell>
        <Table.HeaderCell>Posted Date</Table.HeaderCell>
        <Table.HeaderCell>Close Date</Table.HeaderCell>
        <Table.HeaderCell>Award</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
        {props.grants.map((item: Grant) => {
            return <Table.Row key={item.id}>
                <Table.Cell>
                        {item.id}
                </Table.Cell>
                <Table.Cell>
                    <Link href="/grants/[id]" as={`/grants/${item.id}`}>
                        {item.title}
                    </Link>
                </Table.Cell>
                <Table.Cell>{item.grantor?.agencyName}</Table.Cell>
                <Table.Cell>{item.status}</Table.Cell>
                <Table.Cell>{moment(item.createdAt).format(DATE_FORMAT)}</Table.Cell>
                <Table.Cell>{moment(item.closedAt).format(DATE_FORMAT)}</Table.Cell>
                <Table.Cell>${item.amountInUsd.toLocaleString()}</Table.Cell>
            </Table.Row>
        })}
    </Table.Body>
  </Table>
}