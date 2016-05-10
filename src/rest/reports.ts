import * as Store from "../store/";

function parse(evt): string {
  return evt.target.responseText;
}

export class Reports {
  public static read(c: Store.Connection, name: string, callback: (source: string) => void) {
    let oReq = new XMLHttpRequest();
    oReq.addEventListener("load", (evt) => { callback(parse(evt)); });
    oReq.open("GET", c.cstring + "reports/" + name);
    oReq.send();
  }
}