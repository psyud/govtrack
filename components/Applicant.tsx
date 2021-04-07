import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button, Grid } from "semantic-ui-react";
import Project from "../models/Project";
import { getWeb3Provider } from "../utils/clientUtils";
import Projects from "./Projects";
import client from '../graphql/client';
import { GET_APPLICANT_PROJECTS } from "../graphql/queries";

export default function Applicant() {
    const [ projects, setProjects ] = useState([] as Project[]);
    useEffect(() => {
        (async () => {
            const provider = await getWeb3Provider();
            const { data } = await client.query({
                query: GET_APPLICANT_PROJECTS,
                variables: {
                    applicantId: provider.selectedAddress
                }
            })

            setProjects(data.projects.map(item => Project.parse(item)));
        })();
    }, []);

    return <>
        <Grid>
            <Grid.Row style = {{ display: 'flex', justifyContent: 'flex-end' }}>
                <Link href="/projects/new">
                    <Button primary>Create Project</Button>
                </Link>
            </Grid.Row>
            <Grid.Row>
                <Projects data={projects}/>
            </Grid.Row>
        </Grid>
    </>
}