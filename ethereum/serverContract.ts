/**
 * Readonly
 * Used server side to fetch information before rendering pages
 */

import { ethers } from 'ethers';
import compilation from '../build/contracts/GovTrack.json';

import dotenv from 'dotenv';
dotenv.config();

let provider = new ethers.providers.InfuraProvider('kovan', process.env.INFURA_KEY);

export default new ethers.Contract(process.env.CONTRACT_ADDRESS, compilation.abi as any, provider);
