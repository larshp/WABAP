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
  private prog: REST.ObjectPROG;

  public constructor(name: string, c: Store.Connection) {
    super();
    this.description = name;
    this.prog = new REST.ObjectPROG(c, name);
  }

  public getIcon() {
    return Octicons.fileText;
  }

  public click() {
    this.prog.read((s) => { Store.getStore().tablist.add(this, s); });
  }
}

export class TreeItemSMIM extends TreeItem {
  private smim: REST.ObjectSMIM;

  public constructor(name: string, c: Store.Connection) {
    super();
    this.description = name;
    this.smim = new REST.ObjectSMIM(c, name);
    this.smim.fetch((data) => { this.description = data.URL; });
  }

  public getIcon() {
    return Octicons.question;
  }

  public click() {
    alert("todo, SMIM");
    this.smim.content((data) => { console.log(data); });
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
  private icon: string;

  public constructor(
      category: string,
      description: string,
      objects: REST.TADIREntry[],
      c: Store.Connection,
      icon = Octicons.fileDirectory) {
    super();

    this.description = description;
    this.category = category;
    this.icon = icon;

    this.children = [];

    for (let object of objects) {
// todo, refactor
      switch (object.OBJECT) {
        case "PROG":
          this.children.push(new TreeItemPROG(object.OBJ_NAME, c));
          break;
        case "SMIM":
          this.children.push(new TreeItemSMIM(object.OBJ_NAME, c));
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

  public getContextList() {
    return [
      {
        description: "New " + this.category,
        callback: () => { alert("todo"); },
      },
      ];
  }
}

export class TreeItemDEVC extends TreeItem {
  private connection: Store.Connection;
  private devc: REST.ObjectDEVC;

  public constructor(name: string, c: Store.Connection) {
    super();
    this.description = name;
    this.children = [];
    this.connection = c;

    this.devc = new REST.ObjectDEVC(c, name);
    this.devc.fetch(this.populate.bind(this));
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
// todo, too many parameters
        this.children.push(new TreeItemCategory(
          type,
          this.getTypeDescription(type),
          objects,
          this.connection));
      } else {
        this.children.push(new TreeItemCategory(
          type,
          type + " - Unsupported",
          objects,
          this.connection,
          Octicons.question));
      }
    }
  }

  private isSupported(type: string): boolean {
    return this.getTypeDescription(type) === "" ? false : true;
  }

  private getTypeDescription(type: string): string {
    switch (type) {
      case "PROG":
        return "PROG - Programs";
      case "SMIM":
        return "SMIM - Mime Repository";
      default:
        return "";
    }
  }
}