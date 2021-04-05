import React, { useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import Header from './Header';
import Footer from './Footer';
import 'semantic-ui-css/semantic.min.css'

import {
    metaMaskInstalled,
    walletConnected,
} from '../slices/walletSlice';


interface IProps {
    children: any
}

export default function Layout(props: IProps) {
    const dispatch = useDispatch();
    useEffect(() => {
        async function _() {
            dispatch(metaMaskInstalled(true));
            dispatch(walletConnected(true));
        }
        _()
    })

    return <Container>
        <Header/>
            {props.children}
        <Footer/>
    </Container>
}

