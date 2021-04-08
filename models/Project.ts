import Applicant from "./Applicant";
import GrantRequest from "./GrantRequest";

export default class Project {
    id: string;
    name: string;
    description: string;
    grantRequest?: GrantRequest = null
    owner?: Applicant

    constructor(id: string, name: string, description: string){
        this.id = id;
        this.name = name;
        this.description = description;
    }

    isAvailable(): boolean {
        return this.grantRequest !== null && this.grantRequest !== undefined;
    }

    static parse(item) {
        const project = new Project(item.id, item.name, item.description);
        if(item.owner) {
            project.owner = new Applicant(item.owner.name);
        }

        if(item.grantRequest) {
            project.grantRequest = new GrantRequest(item.grantRequest.id, item.grantRequest.status);
        }

        return project;
    }
}

