import {observable} from "mobx";

export class Tabs {
    @observable public count = 0;

    public addTab() {
        this.count = this.count + 1;
    }
}