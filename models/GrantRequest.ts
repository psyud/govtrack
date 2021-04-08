import { toRequestStatusString } from "../utils/enums";
import Grant from "./Grant";
import Project from "./Project";

export default class GrantRequest {
    id: string
    status: string
    project?: Project
    grant: Grant

    constructor(id: string, status: string){
        this.id = id;
        this.status = status;
    }

    static parse(item) {
        const request = new GrantRequest(item.id, toRequestStatusString(item.status));
        if(item.project){
            request.project = Project.parse(item.project);
        }
        return request;
    }
}