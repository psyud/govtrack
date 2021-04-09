import detectProvider from '@metamask/detect-provider';
import Web3 from 'web3';
import getConfig from 'next/config';

export async function isMetaMaskInstalled()  {
    return await getWeb3ProviderOrNull() !== null;
}

export async function isWalletConnected() {
    try {
        await getSelectedAddress();
        return true;
    }catch(e){
        return false;
    }
}

export async function getWeb3Provider(): Promise<any> {
    let provider = await getWeb3ProviderOrNull();
    if(!provider){
        throw new Error('No provider');
    }
    return provider;
}

export async function getWeb3ProviderOrNull(): Promise<any> {
    try{
        let provider = await detectProvider();
        if(!provider){
            return null;
        }
        return provider;
    }catch(err){
        return null;
    }
}

export async function getEthBalance(address: string) {
    const { publicRuntimeConfig } = getConfig();
    const web3 = new Web3(publicRuntimeConfig.ETH_NODE);

    return await web3.eth.getBalance(address);
}

export async function getSelectedAddress(){
    const provider = await getWeb3Provider();
    const accounts = await provider.request({ method: 'eth_accounts' });
    if(accounts.length === 0){
        throw new Error('Found no account');
    }
    return accounts[0];
}