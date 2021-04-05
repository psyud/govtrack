/**
 * Used client-side
 * Invokes when user connects their wallet
 * Or when user needs to interact with blockchain
 */

import { ethers } from "ethers";
import compilation from '../build/contracts/GovTrack.json';
import { getWeb3Provider, isMetaMaskInstalled } from "../utils/clientUtils";
import contractAddress from '../contract';

if(!isMetaMaskInstalled()){
    throw new Error('Metamask not found');
}

export async function getRwContract(){
    let provider = new ethers.providers.Web3Provider(await getWeb3Provider());
    let signer = provider.getSigner();

    return (new ethers.Contract(contractAddress, compilation.abi as any, provider)).connect(signer);
}

export async function getReadOnlyContract(){
    let provider = new ethers.providers.Web3Provider(await getWeb3Provider());

    return new ethers.Contract(contractAddress, compilation.abi as any, provider);
}