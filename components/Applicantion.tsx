import React from "react";
import { Button, Message, Table } from "semantic-ui-react";
import GrantOpportunity from "../models/GrantOppurtunity";
import Project from "../models/Project";
import Layout from "./Layout";

interface IProps {
    project?: Project;
    grant?: GrantOpportunity
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
                            <Table.Cell>{props.grant.title}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                            <Table.Cell textAlign='right'><b>Agency</b></Table.Cell>
                            <Table.Cell>{props.grant.agencyName}</Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table> 
        }
    </>
}