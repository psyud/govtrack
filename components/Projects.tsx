import Link from "next/link";
import React from "react"
import { Table } from "semantic-ui-react"
import Project from "../models/Project";
import { GrantStatus, RequestStatus, toRequestStatusString } from "../utils/enums";

interface IProps {
    data: Project[]
}

export default function (props: IProps) {
    return <Table size='small'>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Project Address</Table.HeaderCell>
        <Table.HeaderCell>Project Name</Table.HeaderCell>
        <Table.HeaderCell>Description</Table.HeaderCell>
        <Table.HeaderCell>Balance</Table.HeaderCell>
        <Table.HeaderCell>Grant</Table.HeaderCell>
        <Table.HeaderCell>Request Status</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
        {props.data.map((item: Project) => {
            console.log(item.grant)
            return <Table.Row key={item.id} 
                positive={item.grantRequest?.status == RequestStatus.Approved}
            >
                <Table.Cell>
                        {item.id}
                </Table.Cell>
                <Table.Cell>
                    <Link href="/projects/[id]" as={`/projects/${item.id}`}>
                        {item.name}
                    </Link>
                </Table.Cell>
                <Table.Cell>{item.description}</Table.Cell>
                <Table.Cell>${item.balanceInUsd?.toLocaleString()}</Table.Cell>
                <Table.Cell>{item.grant?.title || 'N/A'}</Table.Cell>
                <Table.Cell>{item.grantRequest !== null ? toRequestStatusString(item.grantRequest.status) : 'N/A'}</Table.Cell>
            </Table.Row>
        })}
    </Table.Body>
  </Table>
}