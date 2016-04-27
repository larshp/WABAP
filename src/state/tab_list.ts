import {observable} from "mobx";
import * as State from "./";

export class TabList {
    @observable public tabs: State.Tab[] = [];

    public addTab(t: State.TreeItem) {
        let tab = new State.Tab(t.getDescription());
        this.tabs.push(tab);
    }

    public setActive() {
        State.Main.getState().editor.visible = true;
    }
}