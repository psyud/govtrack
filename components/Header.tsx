import Link from 'next/link';
import React from 'react';
import { Button, Input, Menu } from 'semantic-ui-react';
import { useSelector } from 'react-redux'
import {
    selectWallet
} from '../slices/walletSlice';

 function Header() {
    const wallet = useSelector(selectWallet);
    console.log(wallet);
  
    return (
        <Menu style={{ marginTop: '1em' }}>
        <Menu.Item>
            <Link href="/">Home</Link>
        </Menu.Item>
        
        <Menu.Menu position='right'>
            <Menu.Item>
            <Input icon='search' placeholder='Search...' />
            </Menu.Item>
            <Menu.Item>
                <Link href='/signin'>
                <Button primary>Sign In</Button>
                </Link>
                <Link href='/signup'>
                <Button color='yellow' style={{ marginLeft: '0.3em' }}>Sign Up</Button>
                </Link>
                <Link href="/user" >
                    <Button style={{ marginLeft: '0.3em' }} primary icon='user'/>
                </Link>
            </Menu.Item>
        </Menu.Menu>
        </Menu>
    ); 
}

export default Header;