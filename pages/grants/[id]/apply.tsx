import Link from "next/link";
import { useRouter } from "next/router";
import React, { Component, useEffect, useState } from "react";
import { Button, Checkbox, Dropdown, Form, Grid, Message, Table } from "semantic-ui-react";
import Application from "../../../components/Applicantion";
import Layout from "../../../components/Layout";
import { getReadOnlyContract, getRwContract } from "../../../ethereum/clientContract";
import { getReadonlyContract as getServerContract } from "../../../ethereum/serverContract";
import GrantOpportunity from "../../../models/GrantOppurtunity";
import Project from "../../../models/Project";
import { getWeb3Provider } from "../../../utils/clientUtils";

const projects = [
    {
        key: 'Project Catalyst',
        text: 'Project Catalyst',
        value: 'Project Catalyst'
    }
];

interface IProps{
    grant: GrantOpportunity
}

export default function Apply(props: IProps){
    const router = useRouter();

    const [ projects, setProjects ] = useState([] as Project[]);
    const [ selectedProject, setSelectedProject ] = useState(null);
    const [ agreedToTerms, setAgreedToTerms ] = useState(false);
    const [ isLoading, setIsLoading ] = useState(false);

    useEffect(() => {
        (async() => {
            const provider = await getWeb3Provider();
            const contract = await getReadOnlyContract();
            const rawData = await contract.getProjectsByAppicant(provider.selectedAddress);
            setProjects(rawData.map(item => Project.parse(item)));
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
            await contract.requestGrant(selectedProject.id, props.grant.id);
            router.push('/');
        }catch(e){

        }finally{
            setIsLoading(false);
        }
    }

    const isFormValid = () => selectedProject && props.grant && agreedToTerms;

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
                                    value: item.id
                                }
                            })}
                            onChange={(e, data) => _setSelectedProject(data.value as string)}
                        />
                    </Form.Field>
                    {
                        projects.length === 0 && <Message>Don't have any project? Click <Link href="/projects/new">here</Link> to create one.</Message>
                    }
                    <Application project={selectedProject} grant={props.grant}/>
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

Apply.getInitialProps = async (props: any) => {
    const { id } = props.query;
    if(typeof id === 'undefined'){
        return {};
    }

    const contract = getServerContract();
    const grant = GrantOpportunity.parse(await contract.grants(id));
    grant.agencyName = (await contract.addressToGrantor(grant.agencyAddress)).agencyName;

    return {
        id,
        grant
    }
}
