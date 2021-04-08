import { GetServerSideProps } from "next";
import Link from "next/link";
import React from "react";
import { Button, Header, Icon, Table } from "semantic-ui-react";
import Layout from "../../../components/Layout";
import client from "../../../graphql/client";
import { GET_GRANT_REQUESTS_FOR_GRANT } from "../../../graphql/queries";
import GrantRequest from "../../../models/GrantRequest";
import { RequestStatus, toRequestStatusString } from "../../../utils/enums";

export default function GrantApplicants({ data }) {
    const requests: GrantRequest[] = data.map(item => GrantRequest.parse(item));

    return <Layout>
        <div style={{ textAlign: 'center'}}>
            <Header>Applicants</Header>
        </div>
        <Table>
            <Table.Header>
                <Table.Row>
                        <Table.Cell>Project Name</Table.Cell>
                        <Table.Cell>Project Owner</Table.Cell>
                        <Table.Cell>Project Description</Table.Cell>
                        <Table.Cell>Request Status</Table.Cell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {
                    requests.map(item => {
                        return <Table.Row 
                            key={item.id} 
                            positive={item.status == RequestStatus.Approved}
                        >
                            <Table.Cell>
                                <Link href="/projects/[id]" as={`/projects/${item.project?.id}`}>
                                    {item.project?.name}
                                </Link>
                            </Table.Cell>
                            <Table.Cell>{item.project.owner?.name}</Table.Cell>
                            <Table.Cell>{item.project?.description}</Table.Cell>
                            <Table.Cell>{toRequestStatusString(item.status)}</Table.Cell>
                        </Table.Row>
                    })
                }
            </Table.Body>
        </Table>
    </Layout>
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { data } = await client.query({ 
        query: GET_GRANT_REQUESTS_FOR_GRANT,
        variables: {
            grantId: ctx.query.id
        }
    });
    return {
      props: {
        data: data.grant.grantRequests,
      }
    }
  }