import React, { useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import Header from './Header';
import Footer from './Footer';
import 'semantic-ui-css/semantic.min.css'

import {
    metaMaskInstalled,
    walletConnected,
    loggedIn
} from '../slices/walletSlice';
import { isMetaMaskInstalled, isWalletConnected } from '../utils/clientUtils';


interface IProps {
    children: any
}

export default function Layout(props: IProps) {
    const dispatch = useDispatch();
    useEffect(() => {
        async function _() {
            dispatch(metaMaskInstalled(await isMetaMaskInstalled()));
            dispatch(walletConnected(await isWalletConnected()));

            // TODO handle login check after wallet is connected
        }
        _()
    })

    return <Container>
        <Header/>
            {props.children}
        <Footer/>
    </Container>
}

