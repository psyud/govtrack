import Link from "next/link";
import { useRouter } from "next/router";
import React, { Component, useEffect, useState } from "react";
import { Button, Checkbox, Dropdown, Form, Grid, Message, Table } from "semantic-ui-react";
import Application from "../../../components/Applicantion";
import Layout from "../../../components/Layout";
import { getReadOnlyContract, getRwContract } from "../../../ethereum/clientContract";
import { getReadonlyContract as getServerContract } from "../../../ethereum/serverContract";
import Grant from "../../../models/Grant";
import Project from "../../../models/Project";
import { getWeb3Provider } from "../../../utils/clientUtils";
import { BigNumber } from "@ethersproject/bignumber";
import { GetServerSideProps } from "next";
import client from '../../../graphql/client';
import { GET_APPLICANT_PROJECTS, GET_GRANT_BY_ID } from "../../../graphql/queries";

export default function Apply({ data, usdPerEth }){
    const grant = Grant.parse(data, usdPerEth);
    const router = useRouter();

    const [ projects, setProjects ] = useState([] as Project[]);
    const [ selectedProject, setSelectedProject ] = useState(null);
    const [ agreedToTerms, setAgreedToTerms ] = useState(false);
    const [ isLoading, setIsLoading ] = useState(false);

    useEffect(() => {
        (async() => {
            const provider = await getWeb3Provider();
            const { data } = await client.query({
                query: GET_APPLICANT_PROJECTS,
                variables: {
                    applicantId: provider.selectedAddress
                }
            });
            console.log(data.projects.map(item => Project.parse(item)))
            setProjects(data.projects.map(item => Project.parse(item)));
        })();
    }, []);

    const _setSelectedProject = (address: string) => {
        const filtered = projects.filter(i => i.id === address);
        setSelectedProject(filtered.length === 1 ? filtered[0] : null);
    }

    const handleSubmit = async () => {
        try{
            setIsLoading(true);
            const contract = await getRwContract();
            await contract.requestGrant(selectedProject.id, grant.id);
            router.push('/');
        }catch(e){

        }finally{
            setIsLoading(false);
        }
    }

    const isFormValid = () => selectedProject && grant && agreedToTerms;

    return <Layout>
        <Grid columns={3}>
            <Grid.Column width={4}></Grid.Column>
            <Grid.Column width={8}>
                <Form>
                    <Form.Field>
                        <label>Project</label>
                        <Dropdown 
                            placeholder='Select Project'
                            fluid
                            selection
                            options={projects.map(item => {
                                return {
                                    key: item.id,
                                    text: item.name,
                                    value: item.id,
                                    disabled: item.isAvailable()
                                }
                            })}
                            onChange={(e, data) => _setSelectedProject(data.value as string)}
                        />
                    </Form.Field>
                    {
                        projects.length === 0 && <Message>Don't have any project? Click <Link href="/projects/new">here</Link> to create one.</Message>
                    }
                    <Application project={selectedProject} grant={grant}/>
                    <Form.Field>
                        <Checkbox checked={agreedToTerms} onChange={() => setAgreedToTerms(!agreedToTerms)} label='I agree to the Terms and Conditions' />
                    </Form.Field>
                    <div style={{ textAlign: 'center' }}>
                        <Button onClick={() => handleSubmit()} disabled={!isFormValid() || isLoading} type='submit'>Submit</Button>
                    </div>
                </Form>
            </Grid.Column>
            <Grid.Column width={4}></Grid.Column>
        </Grid>
        
    </Layout>
}


export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const contract = getServerContract();
    const usdPerEth = await contract.getUsdPerEth() as BigNumber;
    const { data } = await client.query({ 
        query: GET_GRANT_BY_ID,
        variables: {
            grantId: ctx.query.id
        }
    });

    return {
      props: {
        data: data.grant,
        usdPerEth: usdPerEth.toNumber()
      }
    }
  }