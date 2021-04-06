import Link from "next/link";
import React from "react";
import { Button, Grid, Table } from "semantic-ui-react";


export default function Grantor() {
    return <>
        <Grid>
            <Grid.Row textAlign='right'>
                <Link href="/grants/new">
                    <Button primary>Create Funding Opportunity</Button>
                </Link>
            </Grid.Row>
            <Grid.Row>
            <Table>
                 <Table.Header>
                     <Table.Row>
                            <Table.Cell>Funding Opportunity Number</Table.Cell>
                            <Table.Cell>Funding Opportunity</Table.Cell>
                            <Table.Cell>Description</Table.Cell>
                            <Table.Cell>Award</Table.Cell>
                     </Table.Row>
                 </Table.Header>
                 <Table.Body>
                     <Table.Row>
                        <Table.Cell>145435</Table.Cell>
                        <Table.Cell>Project Catalyst</Table.Cell>
                        <Table.Cell>Lorem ipsum dolor sit amet</Table.Cell>
                        <Table.Cell>$100,000</Table.Cell>
                     </Table.Row>
                 </Table.Body>
             </Table>
            </Grid.Row>
        </Grid>
    </>
}