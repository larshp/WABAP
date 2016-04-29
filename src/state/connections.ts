import {observable} from "mobx";

export enum ConnectionType {
  SAP,
  MongoDB,
  Offline
}

class Connection {
  @observable public type: ConnectionType;
  @observable public str: string;

  constructor(t: ConnectionType, s: string) {
    this.type = t;
    this.str = s;
  }
}

export class Connections {

  private key = "Connections";

  @observable public list: Connection[];

  public constructor() {
    this.load();
  }

  public add(t: ConnectionType, s: string): void {
    this.list.push(new Connection(t, s));
    this.save();
  }

  public remove() {
// todo
    this.save();
  }

  private load() {
    let value = localStorage.getItem(this.key);
    if (value === null) {
      this.list = [];
    } else {
      this.list = JSON.parse(value);
    }
  }

  private save() {
    localStorage.setItem(this.key, JSON.stringify(this.list));
  }
}