import { RawProject } from "./contracts/GovTrack";

export default class Project {
    id: string;
    owner: string;
    name: string;
    description: string;

    constructor(id: string, owner: string, name: string, description: string){
        this.id = id;
        this.owner = owner;
        this.name = name;
        this.description = description;
    }

    static parse(item: RawProject) {
        return new Project(item.id, item.owner, item.name, item.description);
    }
}