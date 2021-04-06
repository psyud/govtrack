export default class GrantOpportunity {
    id: number;
    title: string;
    agency: string;
    status: string;
    createdAt: Date;
    closedAt: Date;
    amount: number

    constructor(id: number, title: string, agency: string, status: string, createdAt: Date, closedAt) {
        this.id = id;
        this.title = title;
        this.agency = agency;
        this.status = status;
        this.createdAt = createdAt;
        this.closedAt = closedAt;
        this.amount = 100000;
    }
}
