/**
 * Used client-side
 * Invokes when user connects their wallet
 * Or when user needs to interact with blockchain
 */
import getConfig from 'next/config';
import { ethers } from "ethers";
import compilation from '../build/contracts/GovTrack.json';
import { getWeb3Provider, isMetaMaskInstalled } from "../utils/clientUtils";

const { publicRuntimeConfig } = getConfig();

if(!isMetaMaskInstalled()){
    throw new Error('Metamask not found');
}

export async function getRwContract(){
    let provider = new ethers.providers.Web3Provider(await getWeb3Provider());
    let signer = provider.getSigner();

    return (new ethers.Contract(publicRuntimeConfig.CONTRACT_ADDRESS, compilation.abi as any, provider)).connect(signer);
}

export async function getReadOnlyContract(){
    let provider = new ethers.providers.Web3Provider(await getWeb3Provider());

    return new ethers.Contract(publicRuntimeConfig.CONTRACT_ADDRESS, compilation.abi as any, provider);
}