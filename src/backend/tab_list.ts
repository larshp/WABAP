import {observable} from "mobx";
import {TreeItem} from "./tree_item";
import {Tab} from "./tab";

export class TabList {
    @observable public tabs: Tab[] = [];

    public addTab(t: TreeItem) {
        this.tabs.push(new Tab(t.getDescription()));
    }
}