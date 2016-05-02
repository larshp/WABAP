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
    return [{description: "Open package", callback: () => { alert("foo"); }},
      {description: "Close connection", callback: () => { this.close(); }}];
  }

  private close() {
    Store.getStore().connections.remove(this);
  }
}

class ConnectionDummy extends Connection {
  constructor() {
    super(ConnectionType.Online, "", "Add connection");
    this.children = [];
  }

  public getContextList() {
    return [];
  }

  public getIcon() {
    return Octicons.radioTower;
  }

  public click() {
    alert("todo, click icon to the right instead");
  }
}

export class Connections {

  @observable public list: Connection[];

  private key = "Connections";

  public constructor() {
    this.load();
    this.addDummy();
  }

  public add(t: ConnectionType, s: string, d: string): void {
    if (this.list.length === 1 && this.list[0] instanceof ConnectionDummy) {
      this.list = [];
    }
    this.list.push(new Connection(t, s, d));
    this.save();
  }

  public remove(c: Connection) {
    let i = this.list.indexOf(c);
    if(i !== -1) {
	    this.list.splice(i, 1);
    }
    this.save();
    this.addDummy();
  }

  private addDummy() {
    if (this.list.length === 0) {
      this.list = [new ConnectionDummy()];
    }
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