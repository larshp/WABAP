import * as Store from "../store/";

export class BackendObject {
  public c: Store.Connection;
  public name: string;
  public type: string;

  public constructor(c: Store.Connection, name: string, type: string) {
    this.c = c;
    this.name = name;
    this.type = type;
  }
}