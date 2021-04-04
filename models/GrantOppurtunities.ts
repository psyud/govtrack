export default class GrantOpportunity {
    id: string;
    title: string;
    agency: string;
    status: string;
    createdAt: Date;
    closedAt?: Date;
    amount: number

    constructor(id: string, title: string, agency: string, status: string, createdAt: Date, closedAt: Date = null) {
        this.id = id;
        this.title = title,
        this.agency = agency;
        this.status = status;
        this.createdAt = createdAt;
        this.closedAt = closedAt;
        this.amount = 100000;
    }
}
