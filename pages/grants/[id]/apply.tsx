import Link from "next/link";
import React, { Component } from "react";
import { Button, Checkbox, Dropdown, Form, Grid, Message, Table } from "semantic-ui-react";
import Layout from "../../../components/Layout";
import { getReadonlyContract as getServerContract } from "../../../ethereum/serverContract";
import GrantOpportunity from "../../../models/GrantOppurtunity";

const projects = [
    {
        key: 'Project Catalyst',
        text: 'Project Catalyst',
        value: 'Project Catalyst'
    }
];

interface IProps{
    grant: GrantOpportunity
}

export default function Apply(props: IProps){
    return <Layout>
        <Grid columns={3}>
            <Grid.Column width={4}></Grid.Column>
            <Grid.Column width={8}>
                <Form>
                    <Form.Field>
                        <label>Project</label>
                        <Dropdown 
                            placeholder='Select Project'
                            fluid
                            selection
                            options={projects}
                        />
                    </Form.Field>
                    <Message>Don't have any project? Click <Link href="/projects/new">here</Link> to create one.</Message>
                    <Table fixed>
                        <Table.Body>
                            <Table.Row>
                                <Table.Cell textAlign='right'><b>Project Name</b></Table.Cell>
                                <Table.Cell>Project Catalyst</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell textAlign='right'><b>Description</b></Table.Cell>
                                <Table.Cell>Lorem ipsum dolor sit amet, consectetur adipiscing elit</Table.Cell>
                            </Table.Row>
                            </Table.Body>
                    </Table>
                    <div style={{ textAlign: 'center'}}>
                        <Button disabled>Applying to</Button>
                    </div>
                    <Table fixed>
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
                    <Form.Field>
                        <Checkbox label='I agree to the Terms and Conditions' />
                    </Form.Field>
                    <div style={{ textAlign: 'center' }}>
                        <Button  type='submit'>Submit</Button>
                    </div>
                </Form>
            </Grid.Column>
            <Grid.Column width={4}></Grid.Column>
        </Grid>
        
    </Layout>
}

Apply.getInitialProps = async (props: any) => {
    const { id } = props.query;
    if(typeof id === 'undefined'){
        return {};
    }

    const contract = getServerContract();
    const grant = GrantOpportunity.parse(await contract.grants(id));
    grant.agencyName = (await contract.addressToGrantor(grant.agencyAddress)).agencyName;

    return {
        id,
        grant
    }
}
