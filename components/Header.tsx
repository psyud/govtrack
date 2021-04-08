import Link from 'next/link';
import React from 'react';
import { Button, Input, Label, Menu } from 'semantic-ui-react';
import { useSelector } from 'react-redux'
import {
    selectWallet
} from '../slices/walletSlice';
import { toRoleString } from '../utils/enums';

 function Header() {
    const wallet = useSelector(selectWallet);

    const renderButtons = () => {
        const signInButton = <Link href='/signin'>
            <Button primary>Sign In</Button>
        </Link>;
        const signUpButton = <Link href='/signup'>
            <Button color='yellow' style={{ marginLeft: '0.3em' }}>Sign Up</Button>
        </Link>;
        const userButton = <Link href="/user" >
            <Button style={{ marginLeft: '0.3em' }} primary icon='user'/>
        </Link>;

        if(wallet.isLoading) {
            return <Button loading disabled>Detecting</Button>
        }

        if(!wallet.isWalletConnected){
            return <>
                {signInButton}
                {signUpButton}
            </>
        }else if(!wallet.isLoggedIn){
            return signUpButton;
        }else{
            return userButton;
        }
    }
  
    return (
        <Menu style={{ marginTop: '1em' }}>
       
        {
            wallet.isLoggedInAs !== null && wallet.isLoggedInAs !== undefined && 
            <Menu.Item>
                <h4 style={{ color: 'grey' }}>Logged in as {toRoleString(wallet.isLoggedInAs)}</h4>
            </Menu.Item>
        }
         <Menu.Item>
            <Link href="/">Home</Link>
        </Menu.Item>
        
        <Menu.Menu position='right'>
            <Menu.Item>
            <Input icon='search' placeholder='Search... Coming Soon' />
            </Menu.Item>
            <Menu.Item>
                {
                    renderButtons()
                }
            </Menu.Item>
        </Menu.Menu>
        </Menu>
    ); 
}

export default Header;