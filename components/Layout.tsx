import React from 'react';
import { Container } from 'semantic-ui-react';
import Header from './Header';
import 'semantic-ui-css/semantic.min.css'
import Footer from './Footer';

interface IProps {
    children: any
}

export default (props: IProps) => {
    return <Container>
        <Header/>
        {props.children}
        <Footer/>
    </Container>
    
}