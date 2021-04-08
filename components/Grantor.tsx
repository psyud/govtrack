import { BigNumber } from "@ethersproject/bignumber";
import Link from "next/link";
import React, {  useEffect, useState } from "react";
import { Button, Grid } from "semantic-ui-react";
import { GET_GRANTOR_BY_ID } from "../graphql/queries";
import Grant from "../models/Grant";
import { getWeb3Provider } from "../utils/clientUtils";
import Grants from "./Grants";
import client from '../graphql/client';
import { getReadOnlyContract } from "../ethereum/clientContract";

export default function Grantor() {
    const [ grants, setGrants ] = useState([] as Grant[]);
    
    useEffect(() => {
        (async () => {
            const provider = await getWeb3Provider();
            const usdPerEth = await (await getReadOnlyContract()).getUsdPerEth();
            const {data} = await client.query({
                query: GET_GRANTOR_BY_ID,
                variables: {
                    grantorId: provider.selectedAddress
                }
            });

            setGrants(data.grantor.grants.map(item => Grant.parse(item, usdPerEth)));
        })();
    })

    return <>
        <Grid>
            <Grid.Row style = {{ display: 'flex', justifyContent: 'flex-end' }}>
                <Link href="/grants/new">
                    <Button primary>Create Funding Opportunity</Button>
                </Link>
            </Grid.Row>
            <Grid.Row>
                <Grants grants={grants}/>
            </Grid.Row>
        </Grid>
    </>
}