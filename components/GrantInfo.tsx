import moment from "moment";
import React, { Component, useEffect } from "react";
import { Grid, Table } from "semantic-ui-react";
import Grant from "../models/Grant";
import { DATE_FORMAT } from "../utils/constants";

interface IProps {
    grant: Grant
}

export default function GrantInfo(props: IProps) {
    const { grant } = props;
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
                            <Table.Cell>{grant.id}</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell textAlign='right'><b>Funding Oppurtunity Title</b></Table.Cell>
                            <Table.Cell>{grant.title}</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell textAlign='right'><b>Opportunity Category</b></Table.Cell>
                            <Table.Cell>N/A</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell textAlign='right'><b>Posted Date</b></Table.Cell>
                            <Table.Cell>{moment(grant.createdAt).format(DATE_FORMAT)}</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell textAlign='right'><b>Closing Date for Applications</b></Table.Cell>
                            <Table.Cell>{moment(grant.closedAt).format(DATE_FORMAT)}</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell textAlign='right'><b>Estimated Total Program Funding</b></Table.Cell>
                            <Table.Cell>${grant.amountInUsd}</Table.Cell>
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
                            <Table.Cell>{grant.grantor?.agencyName}</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell textAlign='right'><b>Description</b></Table.Cell>
                            <Table.Cell>{grant.description}</Table.Cell>
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