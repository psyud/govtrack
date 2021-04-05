import React, { Component } from "react";
import { Button, Dropdown, Form, Grid, Message } from "semantic-ui-react";
import Layout from "../components/Layout";

export default class SignUp extends Component{
    render() {
        return <Layout>
            <Grid>
                <Grid.Column width={5}></Grid.Column>
                <Grid.Column 
                    width={6}
                >
                    <Grid.Row style={{ 
                        display: 'flex', 
                        justifyContent: 'center',
                        paddingTop: '10em'
                    }} > 
                        <Dropdown placeholder='Sign Up as' options={[
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
                    <Grid.Row style={{
                        paddingTop: '1em',
                        paddingBottom: '10em'
                    }}>
                        <Form>
                            <Form.Field>
                                <label>Agency Name</label>
                                <Form.Input></Form.Input>
                            </Form.Field>
                            <Form.Field>
                                <label>Agency Code</label>
                                <Form.Input></Form.Input>
                            </Form.Field>
                            <div style={{ textAlign: 'center' }}>
                                <Button  type='submit'>Submit</Button>
                            </div>
                        </Form>
                    </Grid.Row>
                </Grid.Column>
                <Grid.Column width={5}></Grid.Column>
            </Grid>
        </Layout>
    }
}