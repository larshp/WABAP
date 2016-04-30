import {observable} from "mobx";
import * as State from "./";
import Octicons from "../misc/octicons";

export abstract class TreeItem {
  @observable public description;
  @observable public expanded;
  @observable public children: TreeItem[];

  public constructor() {
    this.children = [];
    this.expanded = false;
    this.description = "";
  }

  public setExpanded(): void {
    this.expanded = true;
  }

  public toggleExpanded(): void {
    this.expanded = !this.expanded;
  }

  public getIcon(): string {
    return Octicons.question;
  }

  public click(): void {
    return;
  }
}

export class TreeItemPROG extends TreeItem {
  public constructor(name: string) {
    super();
    this.description = name;
  }

  public getIcon() {
    return Octicons.fileText;
  }

  public click() {
    State.Main.getState().tablist.add(this);
  }
}

export class TreeItemDTEL extends TreeItem {
  public constructor(name: string) {
    super();
    this.description = name;
  }

  public getIcon() {
    return Octicons.diffModified;
  }
}

export class TreeItemDOMA extends TreeItem {
  public constructor(name: string) {
    super();
    this.description = name;
  }

  public getIcon() {
    return Octicons.diffIgnored;
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

    switch (this.category) {
      case "PROG":
        this.children.push(new TreeItemPROG("ZPROGRAM"));
        this.children.push(new TreeItemPROG("ZFOOBAR"));
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

  public getIcon() {
    return Octicons.fileDirectory;
  }
}

export class TreeItemDEVC extends TreeItem {

  public constructor(name: string) {
    super();
    this.description = name;

    this.children.push(new TreeItemCategory("PROG", "Programs", this.description));
    this.children.push(new TreeItemCategory("DTEL", "Data Elements", this.description));
    this.children.push(new TreeItemCategory("DOMA", "Domains", this.description));
  }

  public getIcon() {
    return Octicons.fileDirectory;
  }
}