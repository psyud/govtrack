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
import IsApplicant from "../../../components/IsApplicant";
import GrantRequest from "../../../models/GrantRequest";
import TransactionMessages from "../../../components/TransactionMessages";

export default function Apply({ id, data, usdPerEth }){
    const grant = Grant.parse(data, usdPerEth);
    const router = useRouter();

    const [ projects, setProjects ] = useState([] as Project[]);
    const [ selectedProject, setSelectedProject ] = useState(null);
    const [ agreedToTerms, setAgreedToTerms ] = useState(false);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ txHashes, setTxHashes ] = useState([]);

    useEffect(() => {
        (async() => {
            const provider = await getWeb3Provider();
            const { data } = await client.query({
                query: GET_APPLICANT_PROJECTS,
                variables: {
                    applicantId: provider.selectedAddress
                }
            });
            setProjects(data.projects.map(item => Project.parse(item)));
        })();
    }, []); // IMPORTANT OR INFINITE API CALLS

    const _setSelectedProject = (address: string) => {
        const filtered = projects.filter(i => i.id === address);
        setSelectedProject(filtered.length === 1 ? filtered[0] : null);
    }

    const handleSubmit = async () => {
        try{
            setIsLoading(true);
            const contract = await getRwContract();
            const res = await contract.requestGrant(selectedProject.id, grant.id);
            setTxHashes(txHashes.concat(res.hash));

            const updatedProjects = [];
            for(let project of projects){
                if(project.id == selectedProject.id){
                    // just a hack cuz availability is calculated on null-ness
                    project.grantRequest = undefined;
                }
                updatedProjects.push(project);
            }
            setProjects(updatedProjects);
            resetForm();
        }catch(e){

        }finally{
            setIsLoading(false);
        }
    }

    const resetForm = () => {
        setSelectedProject(null);
        setAgreedToTerms(false);
    }

    const isFormValid = () => selectedProject && grant && agreedToTerms;

    return <Layout>
        <IsApplicant>
        <Button onClick={() => router.push(`/grants/${id}`)}>Go back</Button>
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
                                    text: `${item.name}${!item.isAvailable() ? ' (Unavailable)' : ''}`,
                                    value: item.id,
                                    disabled: !item.isAvailable()
                                }
                            })}
                            onChange={(e, data) => _setSelectedProject(data.value as string)}
                        />
                    </Form.Field>
                    {
                        projects.filter(item => item.isAvailable()).length === 0 && <Message>Don't have any project? Click <Link href={`/projects/new?redirectUrl=/grants/${id}/apply`}>here</Link> to create one.</Message>
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
        <TransactionMessages txHashes={txHashes}/>
        </IsApplicant>
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
        usdPerEth: usdPerEth.toNumber(),
        id: ctx.query.id
      }
    }
  }