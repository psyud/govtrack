import { toGrantStatusString } from "../utils/enums";
import moment from 'moment';
import GovTrack from "./contracts/GovTrack";
import { DATE_FORMAT } from '../utils/constants'; 

export default class GrantOpportunity {
    id: number;
    title: string;
    description: string;
    agencyAddress: string;
    agencyName: string;
    status: string;
    createdAt: Date;
    closedAt: Date;
    amount: number

    constructor(id: number, title: string, description: string, agency: string, status: string, createdAt: Date, closedAt: Date) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.agencyAddress = agency;
        this.status = status;
        this.createdAt = createdAt;
        this.closedAt = closedAt;
        this.amount = 100000;
    }

    static parse(item: GovTrack) {
        return new GrantOpportunity(
            Number.parseInt(item.id.toString()), 
            item.name, 
            item.description,
            item.grantor, 
            toGrantStatusString(item.status), 
            new Date(Number.parseInt(item.createdAt.toString()) * 1000), 
            new Date(Number.parseInt(item.deadlineTimestamp.toString()) * 1000)
        )
    }
}
