import { GrantStatus, toGrantStatusString } from "../utils/enums";
import { BigNumber } from "@ethersproject/bignumber";
import { weiToUsd } from "../utils/numbers";
import Grantor from "./Grantor";

export default class Grant {
    id: number;
    title: string;
    description: string;
    grantor?: Grantor
    status: GrantStatus;
    createdAt: Date;
    closedAt: Date;
    amountInUsd: number;

    constructor(id: number, title: string, description: string, amountInUsd: number, status: GrantStatus, createdAt: Date, closedAt: Date) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.amountInUsd = amountInUsd;
        this.status = status;
        this.createdAt = createdAt;
        this.closedAt = closedAt;
    }

    static parse(item: any, usdPerEth: number): Grant {
        const grant = new Grant(
            Number.parseInt(item.id), 
            item.name, 
            item.description,
            weiToUsd(BigNumber.from(item.amountInWei), BigNumber.from(usdPerEth)),
            item.status, 
            new Date(Number.parseInt(item.createdAt.toString()) * 1000), 
            new Date(Number.parseInt(item.deadlineTimestamp.toString()) * 1000)
        )

        if(item.grantor){
            grant.grantor = Grantor.parse(item.grantor);
        }

        return grant;
    }
}
