import React, { Component } from "react";
import { Button, Checkbox, Form } from "semantic-ui-react";
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
            
        </Layout>
    }
}