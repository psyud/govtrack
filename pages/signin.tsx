import Link from "next/link";
import React, { Component } from "react";
import { Button, Dropdown, Form, Grid, Message } from "semantic-ui-react";
import Layout from "../components/Layout";

export default class SignIn extends Component{
    render() {
        return <Layout>
            <Grid>
                <Grid.Column width={3}></Grid.Column>
                <Grid.Column 
                    width={10}
                >
                    <Grid.Row style={{ 
                        display: 'flex', 
                        justifyContent: 'center',
                        padding: '10em'
                    }} > 
                        <Dropdown placeholder='Sign In as' options={[
                            {
                                'text': 'Grantor',
                                'key': 'grantor',
                                'value': 'Grantor'
                            },
                            {
                                'text': 'Applicant',
                                'key': 'applicant',
                                'value': 'Applicant'
                            }
                        ]}>

                        </Dropdown>
                        <Button primary style={{ marginLeft: '1em' }}>Connect Wallet</Button>
                    </Grid.Row>
                    <Grid.Row>
                    <Message error>You have not registered as a grantor/applicant. Please try again or click <Link href="/signup">here</Link> to sign up.</Message>

                    </Grid.Row>
                </Grid.Column>
                <Grid.Column width={3}></Grid.Column>
            </Grid>
        </Layout>
    }
}