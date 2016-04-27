import {observable} from "mobx";

export class Tab {
    @observable public text = "";

    constructor(t: string) {
        this.text = t;
    }
}