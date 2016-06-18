import * as Store from "../store/";
import Manager from "./manager";

function parse(evt): string {
  return evt.target.responseText;
}

export class ObjectPROG {
  public static read(c: Store.Connection, name: string, callback: (source: string) => void) {
    Manager.request("GET", c.cstring + "objects/PROG/" + name + "/abap/", (evt) => { callback(parse(evt)); });
  }
}