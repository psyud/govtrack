import { RawProject } from "./contracts/GovTrack";

export default class Project {
    id: string;
    name: string;
    description: string;

    constructor(id: string,name: string, description: string){
        this.id = id;
        this.name = name;
        this.description = description;
    }

    static parse(item) {
        return new Project(item.id, item.name, item.description);
    }
}