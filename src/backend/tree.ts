import * as Backend from "./";

export class Tree {

    public getRoot(): Backend.TreeItem {
        return new Backend.TreeItem("$TMP", "file", true);
    }

}