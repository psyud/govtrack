import { BigNumber } from "@ethersproject/bignumber";

export function ethToUsd(amountInWei: BigNumber, usdPerEth: BigNumber){
    return amountInWei.div(BigNumber.from('1000000000000000000')).mul(usdPerEth.div(1e8)).toNumber()
}