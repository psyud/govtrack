export default class Grantor {
    
    id: string;
    agencyName: string;
    agencyCode: string;

    constructor(id: string, agencyName: string, agencyCode: string) {
        this.id = id;
        this.agencyName = agencyName;
        this.agencyCode = agencyCode;
    }

    static parse(item): Grantor {
        return new Grantor(item.id, item.agencyName, item.agencyCode);
    }
}