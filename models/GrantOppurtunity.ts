import { toGrantStatusString } from "../utils/enums";
import moment from 'moment';
import {RawGrant} from "./contracts/GovTrack";
import { DATE_FORMAT } from '../utils/constants'; 
import { BigNumber } from "@ethersproject/bignumber";
import { weiToUsd } from "../utils/numbers";

export default class GrantOpportunity {
    id: number;
    title: string;
    description: string;
    agencyAddress: string;
    agencyName: string;
    status: string;
    createdAt: Date;
    closedAt: Date;
    amountInUsd: number;

    constructor(id: number, title: string, description: string, amountInUsd: number, agency: string, status: string, createdAt: Date, closedAt: Date) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.amountInUsd = amountInUsd;
        this.agencyName = agency;
        this.status = status;
        this.createdAt = createdAt;
        this.closedAt = closedAt;
    }

    static parse(item: any, usdPerEth: number) {
        return new GrantOpportunity(
            Number.parseInt(item.id), 
            item.name, 
            item.description,
            weiToUsd(BigNumber.from(item.amountInWei), BigNumber.from(usdPerEth)),
            item.grantor.agencyName, 
            toGrantStatusString(item.status), 
            new Date(Number.parseInt(item.createdAt.toString()) * 1000), 
            new Date(Number.parseInt(item.deadlineTimestamp.toString()) * 1000)
        )
    }
}
