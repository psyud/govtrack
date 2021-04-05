import React, { Component } from "react";
import { Grid, Table } from "semantic-ui-react";
import GrantOpportunity from "../models/GrantOppurtunity";

interface IProps {

}

const data = new GrantOpportunity('DHS-21-DAD-024-00-04', 'Emergency Food and Shelter National Board Program (EFSP), pursuant to the American Rescue Plan Act of 2021, Section 4007', 'DHS-DHS', 'Posted', new Date('04/02/2021'), new Date('06/02/2021'));

export default class GrantInfo extends Component<IProps> {
    render() {
        return <Grid basic='very' style={{ marginTop: '0.1em' }}>
            <Grid.Row>
                <Grid.Column>
                    <Table fixed>
                        <Table.Body>
                            <Table.Row>
                                <Table.Cell textAlign='right'><b>Document Type</b></Table.Cell>
                                <Table.Cell>Grants Notice</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell textAlign='right'><b>Funding Oppurtunity Number</b></Table.Cell>
                                <Table.Cell>{data.id}</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell textAlign='right'><b>Funding Oppurtunity Title</b></Table.Cell>
                                <Table.Cell>{data.title}</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell textAlign='right'><b>Opportunity Category</b></Table.Cell>
                                <Table.Cell>N/A</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell textAlign='right'><b>Posted Date</b></Table.Cell>
                                <Table.Cell>{data.createdAt.toString()}</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell textAlign='right'><b>Closing Date for Applications</b></Table.Cell>
                                <Table.Cell>{data.closedAt?.toString()}</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell textAlign='right'><b>Estimated Total Program Funding</b></Table.Cell>
                                <Table.Cell>${data.amount}</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell textAlign='right'><b>Funding Instrument Type</b></Table.Cell>
                                <Table.Cell>Grant</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell textAlign='right'><b>Expected Number Of Awards</b></Table.Cell>
                                <Table.Cell>1</Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column>
                    <Table fixed>
                        <Table.Body>
                            <Table.Row>
                                <Table.Cell textAlign='right'><b>Eligible Applicants</b></Table.Cell>
                                <Table.Cell>Lorem ipsum dolor sit amet</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell textAlign='right'><b>Additional Information on Eligibility</b></Table.Cell>
                                <Table.Cell>Lorem ipsum dolor sit amet, consectetur adipiscing elit</Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column>
                    <Table fixed>
                        <Table.Body>
                            <Table.Row>
                                <Table.Cell textAlign='right'><b>Agency Name</b></Table.Cell>
                                <Table.Cell>Department of Homeland Security - FEMA</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell textAlign='right'><b>Description</b></Table.Cell>
                                <Table.Cell>Lorem ipsum dolor sit amet, consectetur adipiscing elit</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell textAlign='right'><b>Link to Additional Information</b></Table.Cell>
                                <Table.Cell><a href="https://example.com" target='blank'>https://example.com</a></Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    }
}