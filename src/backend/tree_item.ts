export abstract class TreeItem {

    protected description = "";
    protected type = "";

    private expanded = false;

    public getDescription(): string {
        return this.description;
    }

    public setExpanded(): void {
        this.expanded = true;
    }

    public getType(): string {
        return this.type;
    }

    public toggleExpanded(): void {
        this.expanded = !this.expanded;
    }

    public isExpanded(): boolean {
        return this.expanded;
    }

    public hasChildren(): boolean {
        return false;
    }

    public getChildren(): TreeItem[] {
        return [];
    }
}

export class TreeItemPROG extends TreeItem {
    public constructor(name: string) {
        super();
        this.description = name;
        this.type = "PROG";
    }
}

export class TreeItemDTEL extends TreeItem {
    public constructor(name: string) {
        super();
        this.description = name;
        this.type = "DTEL";
    }
}

export class TreeItemDOMA extends TreeItem {
    public constructor(name: string) {
        super();
        this.description = name;
        this.type = "DOMA";
    }
}

class TreeItemCategory extends TreeItem {

    private devclass = "";
    private category = "";

    public constructor(category: string, description: string, devclass: string) {
        super();

        this.description = description;
        this.devclass = devclass;
        this.category = category;
    }

    public hasChildren(): boolean {
        return true;
    }

    public getChildren() {
        let children: Array<TreeItem> = [];

        switch (this.category) {
            case "PROG":
                children.push(new TreeItemPROG("ZPROGRAM"));
                break;
            case "DTEL":
                children.push(new TreeItemDTEL("ZDATA_ELEMENT"));
                break;
            case "DOMA":
                children.push(new TreeItemDOMA("ZDOMAIN"));
                break;
            default:
                children = [];
                break;
        }

        return children;
    }
}

export class TreeItemDEVC extends TreeItem {

    public constructor(name: string) {
        super();
        this.description = name;
    }

    public hasChildren(): boolean {
        return true;
    }

    public getChildren() {
        let children: Array<TreeItem> = [];

        children.push(new TreeItemCategory("PROG", "Programs", this.description));
        children.push(new TreeItemCategory("DTEL", "Data Elements", this.description));
        children.push(new TreeItemCategory("DOMA", "Domains", this.description));

        return children;
    }

}