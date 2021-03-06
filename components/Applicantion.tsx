import Link from "next/link";
import React from "react";
import { Button, Message, Table } from "semantic-ui-react";
import Grant from "../models/Grant";
import Project from "../models/Project";
import Layout from "./Layout";

interface IProps {
    project?: Project;
    grant?: Grant
}

export default function Application(props: IProps) {
    return <>
        {
            props.project && <Table fixed>
                <Table.Body>
                    <Table.Row>
                        <Table.Cell textAlign='right'><b>Project Name</b></Table.Cell>
                        <Table.Cell>{props.project.name}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell textAlign='right'><b>Description</b></Table.Cell>
                        <Table.Cell>{props.project.description}</Table.Cell>
                    </Table.Row>
                    </Table.Body>
            </Table>
        }
        
        <div style={{ textAlign: 'center'}}>
        {
            props.grant ?  <Message>Applying to</Message> : <Message>Has not applied to any grant</Message>
        }
        </div>
        {
            props.grant && <Table fixed>
                <Table.Body>
                    <Table.Row>
                            <Table.Cell textAlign='right'><b>Funding Opportunity Number</b></Table.Cell>
                            <Table.Cell>{props.grant.id}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                            <Table.Cell textAlign='right'><b>Funding Opportunity Title</b></Table.Cell>
                            <Table.Cell><Link href="/grants/[id]" as={`/grants/${props.grant.id}`}>{props.grant.title}</Link></Table.Cell>
                    </Table.Row>
                    <Table.Row>
                            <Table.Cell textAlign='right'><b>Agency</b></Table.Cell>
                            <Table.Cell>{props.grant.grantor?.agencyName}</Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table> 
        }
    </>
}