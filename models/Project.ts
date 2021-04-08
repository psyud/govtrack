import Applicant from "./Applicant";
import Grant from "./Grant";
import GrantRequest from "./GrantRequest";

export default class Project {
    id: string;
    name: string;
    description: string;
    grantRequest?: GrantRequest = null
    owner?: Applicant
    balanceInUsd?: number
    grant?: Grant

    constructor(id: string, name: string, description: string){
        this.id = id;
        this.name = name;
        this.description = description;
    }

    isAvailable(): boolean {
        return this.grantRequest === null;
    }

    static parse(item) {
        const project = new Project(item.id, item.name, item.description);
        if(item.owner) {
            project.owner = new Applicant(item.owner.name);
        }

        if(item.grantRequest) {
            project.grantRequest = new GrantRequest(item.grantRequest.id, item.grantRequest.status);
            if(item.grantRequest.grant) {
                const { grant } = item.grantRequest;
                project.grant = new Grant(grant.id, grant.name, '', 0, grant.status, new Date(), new Date());
            }
        }

        return project;
    }
}

