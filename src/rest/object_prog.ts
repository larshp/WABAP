import * as Store from "../store/";
import Manager from "./manager";
import * as REST from "./";

function parse(evt): string {
  return evt.target.responseText;
}

export class ObjectPROG {
  private c: Store.Connection;
  private name: string;

  public constructor(c: Store.Connection, name: string) {
    this.c = c;
    this.name = name;
  }

  public read(callback: (source: string) => void) {
    Manager.request(
      "GET",
      this.c.cstring + "objects/PROG/" + this.name + "/abap/",
      (evt) => { callback(parse(evt)); });
  }
}