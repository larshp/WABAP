import {observable} from "mobx";
import * as Store from "./";
import * as REST from "../rest/";
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

  public getContextList(): Store.ContextItem[] {
    return [];
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
    Store.getStore().tablist.add(this);
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

export class TreeItemUnsupported extends TreeItem {
  public constructor(name: string) {
    super();
    this.description = name;
  }

  public getIcon() {
    return Octicons.question;
  }
}

class TreeItemCategory extends TreeItem {
  private category = "";
  private icon;

  public constructor(category: string, description: string, objects: REST.TADIREntry[], icon = Octicons.fileDirectory) {
    super();

    this.description = description;
    this.category = category;
    this.icon = icon;

    this.children = [];

    for (let object of objects) {
      switch (object.OBJECT) {
        case "PROG":
          this.children.push(new TreeItemPROG(object.OBJ_NAME));
          break;
        case "DOMA":
          this.children.push(new TreeItemDOMA(object.OBJ_NAME));
          break;
        case "DTEL":
          this.children.push(new TreeItemDTEL(object.OBJ_NAME));
          break;
        default:
          this.children.push(new TreeItemUnsupported(object.OBJ_NAME));
          break;
      }
    }
  }

  public getIcon() {
    return this.icon;
  }
}

export class TreeItemDEVC extends TreeItem {

  public constructor(name: string, c: Store.Connection) {
    super();
    this.description = name;
    this.children = [];

    REST.TADIR.fetch(c, this.populate.bind(this));
  }

  public getContextList() {
    return [
      {
        description: "New something",
        callback: () => { alert("todo"); },
      },
      ];
  }

  public getIcon() {
    return Octicons.fileDirectory;
  }

  private populate(list: REST.TADIREntry[]) {
    let types: string[] = [];

    for (let entry of list) {
      if (types.indexOf(entry.OBJECT) === -1) {
        types.push(entry.OBJECT);
      }
    }

    for (let type of types) {
      let objects: REST.TADIREntry[] = [];

      for (let object of list) {
        if (object.OBJECT !== type) {
          continue;
        }
        objects.push(object);
      }

      if (this.isSupported(type)) {
        this.children.push(new TreeItemCategory(type, this.getTypeDescription(type), objects));
      } else {
        this.children.push(new TreeItemCategory(type, type + " - Unsupported", objects, Octicons.question));
      }
    }
  }

  private isSupported(type: string): boolean {
    return this.getTypeDescription(type) === "" ? false : true;
  }

  private getTypeDescription(type: string): string {
    switch (type) {
      case "PROG":
        return "Programs";
      case "DTEL":
        return "Data Elements";
      case "DOMA":
        return "Domains";
      default:
        return "";
    }
  }
}