/**
 * Used client-side
 * Invokes when user connects their wallet
 * Or when user needs to interact with blockchain
 */

import { ethers } from "ethers";
import compilation from '../build/contracts/Migrations.json';
import { isMetaMaskInstalled } from "../utils/clientUtils";

if(!isMetaMaskInstalled()){
    throw new Error('Metamask not found');
}

let provider = new ethers.providers.Web3Provider(window.ethereum);
let signer = provider.getSigner();

export default (new ethers.Contract(process.env.CONTRACT_ADDRESS, compilation.abi as any, provider)).connect(signer);
