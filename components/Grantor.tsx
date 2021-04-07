import { BigNumber } from "@ethersproject/bignumber";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Grid, Table } from "semantic-ui-react";
import { getReadOnlyContract } from "../ethereum/clientContract";
import GrantOpportunity from "../models/GrantOppurtunity";
import { selectWallet } from "../slices/walletSlice";
import { getWeb3Provider } from "../utils/clientUtils";
import { weiToUsd } from "../utils/numbers";
import Grants from "./Grants";

export default function Grantor() {
    const [ grants, setGrants ] = useState([] as GrantOpportunity[]);
    useEffect(()=>{
        (async ()=>{
            const provider = await getWeb3Provider();
            const contract = await getReadOnlyContract();
            const raw = await contract.getGrantsByGrantor(provider.selectedAddress);
            
            let agencyName: string;
            if(raw.length > 0){
                agencyName = (await contract.addressToGrantor(raw[0].grantor)).agencyName;
            }
            const usdPerEth = await contract.getUsdPerEth();
            setGrants(raw.map(item => {
                const grant = GrantOpportunity.parse(item)
                grant.agencyName = agencyName;
                grant.amountInUsd = weiToUsd(grant.amountInWei, BigNumber.from(usdPerEth));
                return grant;
            }));
        })();
    }, [])

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