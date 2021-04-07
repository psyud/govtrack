import { BigNumber } from "@ethersproject/bignumber";
const MAGIC_NUMBER = '100000000000000000000000000';

export function weiToUsd(amountInWei: BigNumber, usdPerEth: BigNumber){
    return amountInWei.mul(usdPerEth).div(BigNumber.from(MAGIC_NUMBER)).toNumber();
}