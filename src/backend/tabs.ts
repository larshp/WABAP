import {observable} from "mobx";
import {TreeItem} from "./tree_item";

export class TabList {
    @observable public count = "";

    public addTab(t: TreeItem) {
        this.count = this.count + t.getDescription();
    }
}