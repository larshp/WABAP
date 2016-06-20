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

  public constructor(obj: REST.BackendObject) {
    super();
    this.description = obj.name;
    this.prog = new REST.ObjectPROG(obj);
  }

  public getIcon() {
    return Octicons.fileCode;
  }

  public click() {
    this.prog.getABAP().get((s) => {
      let tab = new Store.Tab(
        this.description,
        s,
        "abap",
        (source) => { alert("todo, save PROG"); });
      Store.getStore().tablist.add(tab); });
  }
}

export class TreeItemSMIM extends TreeItem {
  private smim: REST.ObjectSMIM;

  public constructor(obj: REST.BackendObject) {
    super();
    this.description = name;
    this.smim = new REST.ObjectSMIM(obj);
    this.smim.getMeta().get((data) => { this.description = data.URL; });
  }

  public getIcon() {
    return Octicons.fileText;
  }

  public click() {
    let mode = "";
    if (/\.js$/.test(this.description)) {
      mode = "text/javascript";
    } else if (/\.html?$/.test(this.description)) {
      mode = "text/html";
    } else {
      alert("unsupported mime type");
      return;
    }

    this.smim.getContent().get((s) => {
      let content = this.smim.getContent();
      let tab = new Store.Tab(
        this.description,
        s,
        mode,
        content.save.bind(content));
      Store.getStore().tablist.add(tab); });
  }
}

export class TreeItemUnsupported extends TreeItem {
  public constructor(obj: REST.BackendObject) {
    super();
    this.description = obj.name;
  }

  public getIcon() {
    return Octicons.question;
  }
}

class TreeItemCategory extends TreeItem {
  private category = "";

  public constructor(
      category: string,
      children: REST.TADIREntry[],
      parent: REST.BackendObject) {
    super();

    this.category = category;
    this.children = [];

    this.description = this.buildDescription();

    for (let object of children) {
      let obj = new REST.BackendObject(parent.c, object.OBJ_NAME, object.OBJECT);

      switch (object.OBJECT) {
        case "PROG":
          this.children.push(new TreeItemPROG(obj));
          break;
        case "SMIM":
          this.children.push(new TreeItemSMIM(obj));
          break;
        default:
          this.children.push(new TreeItemUnsupported(obj));
          break;
      }
    }
  }

  public getIcon() {
    if (this.isSupported()) {
      return Octicons.fileDirectory;
    } else {
      return Octicons.question;
    }
  }

  public getContextList() {
    return [
      {
        description: "New " + this.category,
        callback: () => { alert("todo"); },
      },
      ];
  }

  private buildDescription(): string {
    if (this.isSupported()) {
      return this.getTypeDescription();
    } else {
      return this.category + " - Unsupported";
    }
  }

  private isSupported(): boolean {
    return this.getTypeDescription() === "" ? false : true;
  }

  private getTypeDescription(): string {
    switch (this.category) {
      case "PROG":
        return "PROG - Programs";
      case "SMIM":
        return "SMIM - Mime Repository";
      default:
        return "";
    }
  }
}

export class TreeItemDEVC extends TreeItem {
  private devc: REST.ObjectDEVC;
  private obj: REST.BackendObject;

  public constructor(obj: REST.BackendObject) {
    super();
    this.description = obj.name;
    this.children = [];
    this.obj = obj;

    this.devc = new REST.ObjectDEVC(obj);
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

  private populate(devc: REST.DEVCEntry) {
    for (let sub of devc.sub) {
      let obj = new REST.BackendObject(this.obj.c, sub, "DEVC");
      this.children.push(new TreeItemDEVC(obj));
    }

    for (let type of this.uniqueTypes(devc.tadir)) {
      let objects: REST.TADIREntry[] = [];

      for (let object of devc.tadir) {
        if (object.OBJECT !== type) {
          continue;
        }
        objects.push(object);
      }

      this.children.push(new TreeItemCategory(
        type,
        objects,
        this.obj));
    }
  }

  private uniqueTypes(list: REST.TADIREntry[]): string[] {
    let types: string[] = [];

    for (let entry of list) {
      if (types.indexOf(entry.OBJECT) === -1) {
        types.push(entry.OBJECT);
      }
    }

    return types.sort();
  }
}