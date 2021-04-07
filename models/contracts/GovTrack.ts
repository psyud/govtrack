import { BigNumber } from "@ethersproject/bignumber";

export default interface GovTrack {
    id: BigNumber;
    grantor: string;
    name: string;
    description: string;
    amountInWei: BigNumber;
    createdAt: BigNumber;
    deadlineTimestamp: BigNumber;
    status: number;
    isRegistered: boolean
}