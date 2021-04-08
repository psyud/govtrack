import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button, Grid } from "semantic-ui-react";
import Project from "../models/Project";
import { getEthBalance, getWeb3Provider } from "../utils/clientUtils";
import Projects from "./Projects";
import client from '../graphql/client';
import { GET_APPLICANT_PROJECTS } from "../graphql/queries";
import { getReadOnlyContract } from "../ethereum/clientContract";
import { weiToUsd } from "../utils/numbers";
import { BigNumber } from "@ethersproject/bignumber";

export default function Applicant() {
    const [ projects, setProjects ] = useState([] as Project[]);
    useEffect(() => {
        let mounted = true;
        (async () => {
            if(!mounted){
                return;
            }
            const provider = await getWeb3Provider();
            const contract = await getReadOnlyContract();
            const usdPerEth = await contract.getUsdPerEth();

            const { data } = await client.query({
                query: GET_APPLICANT_PROJECTS,
                variables: {
                    applicantId: provider.selectedAddress
                }
            })

            const projects = data.projects.map(item => Project.parse(item));
            for(let project of projects){
                project.balanceInUsd = weiToUsd(BigNumber.from(await getEthBalance(project.id)), usdPerEth);

            }
            setProjects(projects);
        })();

        return function cleanup(){
            mounted = false;
        }
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