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
    loggedIn
} from '../slices/walletSlice';
import{ getReadOnlyContract } from "../ethereum/clientContract";
import { Role } from "../utils/enums";
import RedirectIfLoggedIn from "../components/RedirectIfLoggedIn";

export default function SignIn() {
    const router = useRouter();
    const wallet = useSelector(selectWallet);
    const dispatch = useDispatch();
    const [ isConnecting, setIsConnecting ] = useState(false);
    const [ redirectToSignUp ] = useState(wallet.isWalletConnected && !wallet.isLoggedIn);

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
                        redirectToSignUp && <Message error>
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
