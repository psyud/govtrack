import React, { Component } from "react";
import { Button, Grid, Menu } from "semantic-ui-react";
import GrantInfo from "../../components/GrantInfo";
import Layout from "../../components/Layout"

interface IProps {
    id: any
}

export default class GrantDetail extends Component<IProps>{
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
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button primary>View Applicants</Button>
                <Button color='red'>Apply</Button>
            </div>
            <GrantInfo/>
        </Layout>
    }
}