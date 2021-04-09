import Link from "next/link";
import { useRouter } from 'next/router';
import React, { useEffect, useState } from "react";
import { Button, Dropdown, Form, Grid, Message } from "semantic-ui-react";
import { useSelector, useDispatch } from 'react-redux';
import { getWeb3Provider } from '../utils/clientUtils';
import Layout from "../components/Layout";

import {
    walletConnected,
    selectWallet,
} from '../slices/walletSlice';
import RedirectIfLoggedIn from "../components/RedirectIfLoggedIn";
import { resetPage, signIn } from "../slices/pageSlice";

export default function SignIn() {
    const wallet = useSelector(selectWallet);
    const dispatch = useDispatch();

    const [ isConnecting, setIsConnecting ] = useState(false);
    const [ redirectToSignUp, setRedirectToSignUp ] = useState(false);

    useEffect(() => {
        dispatch(signIn());

        (async () => {

            if(wallet.isWalletConnected && !wallet.isLoggedIn){
                setRedirectToSignUp(true)
            }
        })()

        return function cleanup(){
            dispatch(resetPage())
        }
    })

    const connectWallet = async () => {
        try{
            setIsConnecting(true);
            const provider = await getWeb3Provider();
            await provider.enable();
            dispatch(walletConnected(true));
        }finally{
            setIsConnecting(false);
        }
    }

    return <Layout>
        <RedirectIfLoggedIn>
        <Grid>
            <Grid.Column width={3}></Grid.Column>
            <Grid.Column 
                width={10}
                style={{ 
                    padding: '10em'
                }}
                textAlign='center'
            >
                <Grid.Row>
                    {
                        !wallet.isMetaMaskInstalled && <Message warning>Please install MetaMask</Message> 
                    }
                    {
                        wallet.isMetaMaskInstalled && !wallet.isWalletConnected &&  <Button 
                            loading={isConnecting}
                            disabled={isConnecting}
                            onClick={()=>connectWallet()} 
                            primary 
                            style={{ marginLeft: '1em' }}
                        >Connect Wallet</Button>
                    }
                    </Grid.Row><br/>
                    <Grid.Row>
                    {
                        redirectToSignUp && <Message error style={{ textAlign: 'center' }}>
                            Seems like you have not registered. Please go to <Link href='/signup'>Sign Up</Link> instead.
                        </Message>
                    }
                    </Grid.Row>
            </Grid.Column>
            <Grid.Column width={3}></Grid.Column>
        </Grid>
        </RedirectIfLoggedIn>
    </Layout>
}
