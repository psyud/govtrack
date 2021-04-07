import { BigNumber } from "@ethersproject/bignumber";

export interface RawGrant {
    id: string;
    grantor: string;
    name: string;
    description: string;
    amountInWei: BigNumber;
    createdAt: BigNumber;
    deadlineTimestamp: BigNumber;
    status: number;
    isRegistered: boolean
}

export interface RawProject {
    id: string,
    owner: string,
    name: string;
    description: string
}