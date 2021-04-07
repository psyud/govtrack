import { toGrantStatusString } from "../utils/enums";
import moment from 'moment';
import GovTrack from "./contracts/GovTrack";
import { DATE_FORMAT } from '../utils/constants'; 
import { BigNumber } from "@ethersproject/bignumber";

export default class GrantOpportunity {
    id: number;
    title: string;
    description: string;
    agencyAddress: string;
    agencyName: string;
    status: string;
    createdAt: Date;
    closedAt: Date;
    amountInWei: BigNumber;
    amountInUsd: number;

    constructor(id: number, title: string, description: string, amountInWei: BigNumber, agency: string, status: string, createdAt: Date, closedAt: Date) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.amountInWei = amountInWei;
        this.agencyAddress = agency;
        this.status = status;
        this.createdAt = createdAt;
        this.closedAt = closedAt;
    }

    static parse(item: GovTrack) {
        return new GrantOpportunity(
            Number.parseInt(item.id.toString()), 
            item.name, 
            item.description,
            item.amountInWei,
            item.grantor, 
            toGrantStatusString(item.status), 
            new Date(Number.parseInt(item.createdAt.toString()) * 1000), 
            new Date(Number.parseInt(item.deadlineTimestamp.toString()) * 1000)
        )
    }
}
