import { BigNumber } from "@ethersproject/bignumber";

export function weiToUsd(amountInWei: BigNumber, usdPerEth: BigNumber){
    return amountInWei.div(BigNumber.from('1000000000000000000')).mul(usdPerEth.div(1e8)).toNumber()
}