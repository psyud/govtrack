import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button, Grid } from "semantic-ui-react";
import { getReadOnlyContract } from "../ethereum/clientContract";
import { RawProject } from "../models/contracts/GovTrack";
import Project from "../models/Project";
import { getWeb3Provider } from "../utils/clientUtils";
import Projects from "./Projects";

export default function Applicant() {
    const [ projects, setProjects ] = useState([] as Project[]);
    useEffect(() => {
        (async () => {
            const provider = await getWeb3Provider();
            const contract = await getReadOnlyContract();
            const rawData = await contract.getProjectsByAppicant(provider.selectedAddress);
            setProjects(rawData.map((item: RawProject) => Project.parse(item)));
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