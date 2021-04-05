import React, { Component } from "react";
import { Icon, Table } from "semantic-ui-react";
import Layout from "../components/Layout";
import IEmptyProps from '../props/IEmptyProps';
import IWalletState from '../states/IWalletState';

export default class Grantor extends Component<IEmptyProps, IWalletState>{
    state = {
        isWalletConnected: false
    }

    async componentDidMount() {

    }

    render () {
        return <Layout>
            <Table>
                <Table.Header>
                    <Table.Row>
                            <Table.Cell>Project Name</Table.Cell>
                            <Table.Cell>Funding Opportunity</Table.Cell>
                            <Table.Cell>Funding Opportunity Number</Table.Cell>
                            <Table.Cell>Action</Table.Cell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    <Table.Row>
                        <Table.Cell>Project Catalyst</Table.Cell>
                        <Table.Cell>Lorem ipsum dolor sit amet</Table.Cell>
                        <Table.Cell>145435</Table.Cell>
                        <Table.Cell>
                            <Icon color='green' name='checkmark' size='large' />
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Project Catalyst</Table.Cell>
                        <Table.Cell>Lorem ipsum dolor sit amet</Table.Cell>
                        <Table.Cell>657456</Table.Cell>
                        <Table.Cell>
                            <Icon color='red' name='close' size='large' />
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Project Catalyst</Table.Cell>
                        <Table.Cell>Lorem ipsum dolor sit amet</Table.Cell>
                        <Table.Cell>65464521</Table.Cell>
                        <Table.Cell>
                            <Icon color='yellow' name='question circle' size='large' />
                        </Table.Cell>
                    </Table.Row>
                    
                </Table.Body>
            </Table>
        </Layout>
    }
}