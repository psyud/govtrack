import React from 'react';
import Grants from '../components/Grants';
import Layout from '../components/Layout';
import { GetServerSideProps } from 'next';
import client from '../graphql/client';
import { GET_GRANTS } from '../graphql/queries';
import GrantOpportunity from '../models/GrantOppurtunity';
import { getReadonlyContract } from '../ethereum/serverContract';
import { BigNumber } from '@ethersproject/bignumber';

export default function Index ({ data, usdPerEth }) {
  const grants = data.map(item =>  GrantOpportunity.parse(item, usdPerEth));

  return <Layout>
    <Grants grants={grants}/>
  </Layout>
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const contract = getReadonlyContract();
  const usdPerEth = await contract.getUsdPerEth() as BigNumber;
  const { data } = await client.query({ query: GET_GRANTS });
  return {
    props: {
      data: data.grants,
      usdPerEth: usdPerEth.toNumber()
    }
  }
}