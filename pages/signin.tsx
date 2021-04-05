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

export default function SignIn() {
    const router = useRouter();
    const wallet = useSelector(selectWallet);
    const dispatch = useDispatch();
    const [ isConnecting, setIsConnecting ] = useState(false);
    const [ redirectToSignUp, setRedirectToSignUp ] = useState(false);

    useEffect(() => {
        async function redirect(){
            if(wallet.isWalletConnected){
                const provider = await getWeb3Provider();
    
                const contract = await getReadOnlyContract();
                const applicant = await contract.addressToApplicant(provider.selectedAddress);
                if(applicant.isRegistered){
                    dispatch(loggedIn(Role.Applicant));
                    router.replace('/');
                    return;
                }
                const grantor = await contract.addressToGrantor(provider.selectedAddress);
                if(grantor.isRegistered){
                    dispatch(loggedIn(Role.Grantor));
                    router.replace('/');
                    return;
                }
                setRedirectToSignUp(true);
            }
        }
        redirect();
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
                        !wallet.isWalletConnected &&  <Button 
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
    </Layout>
}
