import * as Backend from "./";

export class Tree {

    private root: Backend.TreeItem;

    constructor() {
        this.root = new Backend.TreeItemDEVC("$TMP");
        this.root.setExpanded();
    }

    public getRoot(): Backend.TreeItem {
        return this.root;
    }

}