import Link from 'next/link';
import React, { Component } from 'react';
import { Button, Input, Menu } from 'semantic-ui-react';
import { isMetaMaskInstalled, isWalletConnected } from '../utils/clientUtils';

interface IProps {
}

interface IState {
    isMetaMaskInstalled: boolean,
    isWalletConnected: boolean,
    isWalletConnecting: boolean
}


export default class Header extends Component<IProps, IState>{
    state = {
        isMetaMaskInstalled: false,
        isWalletConnected: false,
        isWalletConnecting: false
    }
    connectWallet = async e => {
        try {
            this.setState({ isWalletConnecting: true })
            await window.ethereum.enable();
            this.setState({ isWalletConnected: true, isWalletConnecting: false })
        }catch(e){
            this.setState({ isWalletConnecting: false })
        }
    }

    async componentDidMount() {
        this.setState({
            isMetaMaskInstalled: await isMetaMaskInstalled(),
            isWalletConnected: await isWalletConnected()
        })
    }

    getWalletButtonColor = () => {
        if(!this.state.isMetaMaskInstalled){
            return 'yellow';
        }
        if(!this.state.isWalletConnected){
            return 'blue';
        }
        return 'grey';
    }

    getWalletButtonText = () => {
        if(!this.state.isMetaMaskInstalled){
            return 'Metamask Not Detected';
        }
        if(!this.state.isWalletConnected && !this.state.isWalletConnecting){
            return 'Connect Wallet';
        }
        if(this.state.isWalletConnecting){
            return 'Connecting';
        }
        return 'Connected';
    }

    render() {
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

} 