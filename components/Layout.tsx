import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import Header from './Header';
import 'semantic-ui-css/semantic.min.css'
import Footer from './Footer';
import IWalletState from '../states/IWalletState';

interface IProps {
    children: any
}

export default class Layout extends Component<IProps>{
    render(){
        return <Container>
            <Header/>
            {this.props.children}
            <Footer/>
        </Container>
    }
    
    
}