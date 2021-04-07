import Link from "next/link";
import React from "react"
import { Table } from "semantic-ui-react"
import Project from "../models/Project";

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
      </Table.Row>
    </Table.Header>

    <Table.Body>
        {props.data.map((item: Project) => {
            return <Table.Row key={item.id}>
                <Table.Cell>
                        {item.id}
                </Table.Cell>
                <Table.Cell>
                    <Link href="/projects/[id]" as={`/projects/${item.id}`}>
                        {item.name}
                    </Link>
                </Table.Cell>
                <Table.Cell>{item.description}</Table.Cell>
            </Table.Row>
        })}
    </Table.Body>
  </Table>
}