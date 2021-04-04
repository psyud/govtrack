import Head from 'next/head'
import Link from 'next/link';
import React, { Component } from 'react';
import { Button, Container, Header, Rating, Table } from 'semantic-ui-react';
import Grants from '../components/Grants';
import Layout from '../components/Layout';
import { isMetaMaskInstalled } from '../utils/clientUtils';

interface IProps {

}

interface IState {
  hasMetaMask: boolean,
  isConnectedToMetaMask: boolean
}

export default class Index extends Component<IProps, IState> {

  render() {
      return <Layout>
        <Grants data={[]}/>
      </Layout>
  }
}