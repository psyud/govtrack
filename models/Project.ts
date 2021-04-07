export default class Project {
    
    id: string;
    name: string;
    description: string;
    grantRequest?: GrantRequest = null

    constructor(id: string,name: string, description: string, grantRequest){
        this.id = id;
        this.name = name;
        this.description = description;

        if(grantRequest){
            grantRequest = new GrantRequest(grantRequest.id, grantRequest.status)
        }
    }

    isAvailable(): boolean {
        return this.grantRequest !== null && this.grantRequest !== undefined;
    }

    static parse(item) {
        return new Project(item.id, item.name, item.description, item.grantRequest);
    }
}

class GrantRequest {
    id: string
    status: string

    constructor(id: string, status: string){
        this.id = id;
        this.status = status;
    }
}