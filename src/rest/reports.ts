import * as Store from "../store/";
import Manager from "./manager";

function parse(evt): string {
  let json = JSON.parse(evt.target.responseText);
  let result = "";
  for (let line of json.DATA.SOURCE) {
    result = result + line.LINE + "\n";
  }
  return result;
}

export class Reports {
  public static read(c: Store.Connection, name: string, callback: (source: string) => void) {
    Manager.request("GET", c.cstring + "reports/" + name, (evt) => { callback(parse(evt)); });
  }
}