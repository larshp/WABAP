export class TreeItem {

    private text = "";
    private icon = "";
    private expanded = false;

    public constructor(text: string, icon: string, expanded: boolean) {
        this.text = text;
        this.icon = icon;
        this.expanded = expanded;
    }

    public getText(): string {
        return this.text;
    }

    public hasChildren(): boolean {
        if(this.text === "bar") return false;
        return true;
    }

    public isExpanded(): boolean {
        return this.expanded;
    }

    public getChildren(): TreeItem[] {
        let children: Array<TreeItem> = [];

        children.push(new TreeItem("foo", "file", false));
        children.push(new TreeItem("bar", "file", false));

        return children;
    }
}