import Head from 'next/head'
import Link from 'next/link';
import React, { Component } from 'react';
import { Button, Container, Header, Rating, Table } from 'semantic-ui-react';
import Grants from '../components/Grants';
import Layout from '../components/Layout';
import { getReadonlyContract } from '../ethereum/serverContract';

export default function Index ({ data }) {
  return <Layout>
    <Grants data={data}/>
  </Layout>
}

Index.getInitialProps = async () => {
  const contract = getReadonlyContract();
  const data = await contract.getAllGrants();
  
  return {
    data
  }
}