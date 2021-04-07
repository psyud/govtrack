import Link from "next/link";
import React, { Component } from "react";
import { Button, Grid, Menu } from "semantic-ui-react";
import GrantInfo from "../../../components/GrantInfo";
import Layout from "../../../components/Layout"
import { getReadonlyContract } from "../../../ethereum/serverContract";
import GrantOpportunity from "../../../models/GrantOppurtunity";

import {
    selectWallet
} from '../../../slices/walletSlice';
import { useSelector } from "react-redux";
import { Role } from "../../../utils/enums";
import { BigNumber } from "@ethersproject/bignumber";
import { weiToUsd as weiToUsd } from "../../../utils/numbers";
import { GetServerSideProps } from "next";
import { GET_GRANTS, GET_GRANT_BY_ID } from "../../../graphql/queries";
import client from "../../../graphql/client";

export interface IProps {
    id: any,
    data: any,
    usdPerEth: number
}

export default function GrantDetail({ id, data, usdPerEth }) {
    const { isLoggedInAs, isLoggedIn } = useSelector(selectWallet);
    const grant = GrantOpportunity.parse(data, usdPerEth)

    return <Layout>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <div>
                    <Link href="/grants/[id]/applicants" as={`/grants/${id}/applicants`}>
                        <Button primary>View Applicants</Button>
                    </Link>
                    {
                        isLoggedInAs !== Role.Grantor && <Link href="/grants/[id]/apply" as={`/grants/${id}/apply`}>
                            <Button disabled={!isLoggedIn} color='red'>Apply</Button>
                        </Link>
                    }
                </div>
                
            </div>
            <GrantInfo grant={grant}/>
        </Layout>
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const contract = getReadonlyContract();
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
