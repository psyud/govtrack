import Link from "next/link";
import React, { Component } from "react";
import { Button, Grid, Menu } from "semantic-ui-react";
import GrantInfo from "../../../components/GrantInfo";
import Layout from "../../../components/Layout"

export interface IProps {
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
                <Link href="/grants/[id]/applicants" as={`/grants/${this.props.id}/applicants`}>
                    <Button primary>View Applicants</Button>
                </Link>
                <Link href="/grants/[id]/apply" as={`/grants/${this.props.id}/apply`}>
                    <Button color='red'>Apply</Button>
                </Link>
            </div>
            <GrantInfo/>
        </Layout>
    }
}