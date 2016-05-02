import {observable} from "mobx";
import * as Store from "./";
import * as REST from "../rest/";
import Octicons from "../misc/octicons";

export enum ConnectionType {
  Online,
  Offline
}

export class Connection extends Store.TreeItem {
  public ctype: ConnectionType;
  public cstring: string;

  constructor(t: ConnectionType, s: string, d: string) {
    super();
    this.ctype = t;
    this.cstring = s;
    this.description = d;

// todo
// REST.TADIR.fetch(this.cstring);

    this.children = [new Store.TreeItemDEVC("$TMP")];
  }

  public getIcon() {
    return Octicons.beaker;
  }

  public getContextList() {
    return [{description: "foo", callback: () => {}},
      {description: "bar", callback: () => {}}];
  }
}

export class Connections {

  @observable public list: Connection[];

  private key = "Connections";

  public constructor() {
    this.load();
  }

  public add(t: ConnectionType, s: string, d: string): void {
    this.list.push(new Connection(t, s, d));
    this.save();
  }

  public remove() {
// todo
    this.save();
  }

  private load() {
    let value = localStorage.getItem(this.key);
    if (!value) {
      this.list = [];
    } else {
      let parsed = JSON.parse(value);
      this.list = parsed.map((item) => {
        return new Connection(item.ctype, item.cstring, "foobar"); });
    }
  }

  private save() {
    let mapped = this.list.map((con) => {
      return {ctype: con.ctype, cstring: con.cstring}; });
    localStorage.setItem(this.key, JSON.stringify(mapped));
  }
}