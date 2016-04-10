import {observable} from "mobx";

export abstract class TreeItem {

    protected description = "";
    protected type = "";

    @observable public expanded = false;

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
/*
    @computed get isExpanded(): boolean {
        return this.expanded;
    }
*/
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
    private children: Array<TreeItem> = [];

    public constructor(category: string, description: string, devclass: string) {
        super();

        this.description = description;
        this.devclass = devclass;
        this.category = category;

        switch (this.category) {
            case "PROG":
                this.children.push(new TreeItemPROG("ZPROGRAM"));
                break;
            case "DTEL":
                this.children.push(new TreeItemDTEL("ZDATA_ELEMENT"));
                break;
            case "DOMA":
                this.children.push(new TreeItemDOMA("ZDOMAIN"));
                break;
            default:
                this.children = [];
                break;
        }
    }

    public hasChildren(): boolean {
        return true;
    }

    public getChildren() {
        return this.children;
    }
}

export class TreeItemDEVC extends TreeItem {

    private children: Array<TreeItem> = [];

    public constructor(name: string) {
        super();
        this.description = name;
        this.type = "DEVC";

        this.children.push(new TreeItemCategory("PROG", "Programs", this.description));
        this.children.push(new TreeItemCategory("DTEL", "Data Elements", this.description));
        this.children.push(new TreeItemCategory("DOMA", "Domains", this.description));
    }

    public hasChildren(): boolean {
        return true;
    }

    public getChildren() {
        return this.children;
    }

}