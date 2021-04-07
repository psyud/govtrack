import Head from 'next/head'
import Link from 'next/link';
import React, { Component } from 'react';
import { Button, Container, Header, Rating, Table } from 'semantic-ui-react';
import Grants from '../components/Grants';
import Layout from '../components/Layout';
import { getReadonlyContract } from '../ethereum/serverContract';
import {RawGrant} from '../models/contracts/GovTrack';
import GrantOpportunity from '../models/GrantOppurtunity';
import { weiToUsd } from '../utils/numbers';

export default function Index ({ data }) {
  return <Layout>
    <Grants data={data}/>
  </Layout>
}

Index.getInitialProps = async () => {
  const contract = getReadonlyContract();
  const rawData: RawGrant[] = await contract.getAllGrants();
  const data = rawData.map(item => GrantOpportunity.parse(item));

  let addressToAgencies: Map<string, string> = new Map();
  const addresses = new Set(data.map(item => item.agencyAddress));

  for(let address of addresses){
    addressToAgencies.set(address, (await contract.addressToGrantor(address)).agencyName);
  }

  const usdPerEth = await contract.getUsdPerEth();
  for(let grant of data){
    grant.agencyName = addressToAgencies.get(grant.agencyAddress);
    grant.amountInUsd = weiToUsd(grant.amountInWei, usdPerEth);
  }

  return {
    data
  }
}