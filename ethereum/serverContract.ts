/**
 * Readonly
 * Used server side to fetch information before rendering pages
 */
import getConfig from 'next/config';
import { ethers } from 'ethers';
import compilation from '../build/contracts/GovTrack.json';

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig()

export function getReadonlyContract() {
    let provider = new ethers.providers.InfuraProvider('rinkeby', serverRuntimeConfig.INFURA_KEY);

    return new ethers.Contract(publicRuntimeConfig.CONTRACT_ADDRESS, compilation.abi as any, provider);
}