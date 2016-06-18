import * as Store from "../store/";
import Manager from "./manager";

function parse(evt): TADIREntry[] {
  let json = JSON.parse(evt.target.responseText);
  let result: TADIREntry[] = [];
  for (let entry of json.DATA.CONTENTS) {
    result.push(new TADIREntry(entry as ITADIREntry));
  }
  return result;
}

interface ITADIREntry {
  OBJECT: string;
  OBJ_NAME: string;
}

export class TADIREntry implements ITADIREntry {
  public OBJECT: string;
  public OBJ_NAME: string;

  public constructor(data: ITADIREntry) {
    this.OBJECT = data.OBJECT;
    this.OBJ_NAME = data.OBJ_NAME;
  }
}

export class ObjectDEVC {
  public static fetch(c: Store.Connection, callback: (list: TADIREntry[]) => void) {
    Manager.request("GET", c.cstring + "objects/DEVC/%24TMP/", (evt) => { callback(parse(evt)); });
  }
}