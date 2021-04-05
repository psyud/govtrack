import React, { useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import Header from './Header';
import Footer from './Footer';
import 'semantic-ui-css/semantic.min.css'

import {
    metaMaskInstalled,
    walletConnected,
    loggedIn,
    selectWallet
} from '../slices/walletSlice';
import { getWeb3Provider, isMetaMaskInstalled, isWalletConnected } from '../utils/clientUtils';
import { getReadOnlyContract } from '../ethereum/clientContract';
import { Role } from '../utils/enums';


interface IProps {
    children: any
}

export default function Layout(props: IProps) {
    const wallet = useSelector(selectWallet);
    const dispatch = useDispatch();
    useEffect(() => {
        async function _() {
            dispatch(metaMaskInstalled(await isMetaMaskInstalled()));
            dispatch(walletConnected(await isWalletConnected()));

            if(wallet.isWalletConnected){
                const provider = await getWeb3Provider()
                const contract = await getReadOnlyContract();

                let result = await contract.addressToApplicant(provider.selectedAddress);
                if(result.isRegistered){
                    dispatch(loggedIn(Role.Applicant));
                    return;
                }
                result = await contract.addressToGrantor(provider.selectedAddress);
                if(result.isRegistered){
                    dispatch(loggedIn(Role.Grantor));
                    return;
                }
            }
        }
        _()
    })

    return <Container>
        <Header/>
            {props.children}
        <Footer/>
    </Container>
}

