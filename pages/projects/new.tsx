import React, { Component } from "react";
import { Button, Checkbox, Dropdown, Form, Grid, Message, Table } from "semantic-ui-react";
import Layout from "../../components/Layout";

export default class NewProject extends Component {
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
            <Grid columns={3}>
                <Grid.Column width={4}></Grid.Column>
                <Grid.Column width={8}>
                    <Form>
                        <Form.Field>
                            <label>Project Name</label>
                            <Form.Input/>
                        </Form.Field>
                        <Form.Field>
                            <label>Project Description</label>
                            <Form.Input/>
                        </Form.Field>
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
}