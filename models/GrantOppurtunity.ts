import { toGrantStatusString } from "../utils/enums";

export default class GrantOpportunity {
    id: number;
    title: string;
    description: string;
    agency: string;
    status: string;
    createdAt: Date;
    closedAt: Date;
    amount: number

    constructor(id: number, title: string, description: string, agency: string, status: string, createdAt: Date, closedAt) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.agency = agency;
        this.status = status;
        this.createdAt = createdAt;
        this.closedAt = closedAt;
        this.amount = 100000;
    }

    static parse(item:any) {
        return new GrantOpportunity(
            Number.parseInt(item[0]._hex), 
            item[2], 
            item[3],
            item[1], 
            toGrantStatusString(item[6]), 
            new Date(0), 
            new Date(Number.parseInt(item[5]._hex) * 1000)
        )
    }
}
