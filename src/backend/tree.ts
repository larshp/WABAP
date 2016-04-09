import * as Backend from "./";

export class Tree {

    public getRoot(): Backend.TreeItem {
        let item = new Backend.TreeItemDEVC("$TMP");
        item.setExpanded();
        return item;
    }

}