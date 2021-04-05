import detectProvider from '@metamask/detect-provider';

export async function isMetaMaskInstalled()  {
    return await getWeb3ProviderOrNull() !== null;
}

export async function isWalletConnected() {
    let provider: any = await getWeb3ProviderOrNull();
    if(!provider){
        return false;
    }

    return provider.selectedAddress !== null;
}

export async function getWeb3Provider(): Promise<any> {
    let provider = await getWeb3ProviderOrNull();
    if(!provider){
        throw new Error('No provider');
    }
    return provider;
}

async function getWeb3ProviderOrNull() {
    let provider = await detectProvider();
    if(!provider){
        return null;
    }
    return provider;
}