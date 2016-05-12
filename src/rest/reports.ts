import * as Store from "../store/";

function parse(evt): string {
  console.log("hello");
  let json = JSON.parse(evt.target.responseText);
  let result = "";
  for (let line of json.DATA.SOURCE) {
    result = result + line.LINE + "\n";
  }
  return result;
}

export class Reports {
  public static read(c: Store.Connection, name: string, callback: (source: string) => void) {
    let oReq = new XMLHttpRequest();
    oReq.addEventListener("load", (evt) => { callback(parse(evt)); });
    oReq.open("GET", c.cstring + "reports/" + name);
    oReq.send();
  }
}