import React, { Component } from "react";
import { Button, Checkbox, Form, Icon, Table } from "semantic-ui-react";
import { IProps } from ".";
import Layout from "../../../components/Layout";

export default class GrantApplicants extends Component<IProps>{
    static async getInitialProps(props: any) {
        const { id } = props.query;
        if(typeof id === 'undefined'){
            return {};
        }

        return {
            id
        }
    }

    render() {
        return <Layout>
            <Table>
                <Table.Header>
                    <Table.Row>
                            <Table.Cell>Project Name</Table.Cell>
                            <Table.Cell>Project Owner</Table.Cell>
                            <Table.Cell>Winner</Table.Cell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    <Table.Row>
                        <Table.Cell>Project Catalyst</Table.Cell>
                        <Table.Cell>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi elementum massa eget tellus faucibus, at blandit leo ullamcorper. Vivamus leo dolor, lobortis ut viverra at, aliquam id nulla. Fusce efficitur.</Table.Cell>
                        <Table.Cell>
                            <Icon color='green' name='checkmark' size='large' />
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Project Catalyst</Table.Cell>
                        <Table.Cell>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi elementum massa eget tellus faucibus, at blandit leo ullamcorper. Vivamus leo dolor, lobortis ut viverra at, aliquam id nulla. Fusce efficitur.</Table.Cell>
                        <Table.Cell>
                            <Icon color='red' name='close' size='large' />
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Project Catalyst</Table.Cell>
                        <Table.Cell>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi elementum massa eget tellus faucibus, at blandit leo ullamcorper. Vivamus leo dolor, lobortis ut viverra at, aliquam id nulla. Fusce efficitur.</Table.Cell>
                        <Table.Cell>
                            <Icon color='yellow' name='question circle' size='large' />
                        </Table.Cell>
                    </Table.Row>
                    
                </Table.Body>
            </Table>
        </Layout>
    }
}