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
  private c: Store.Connection;
  private name: string;

  public constructor(c: Store.Connection, name: string) {
    this.c = c;
    this.name = name;
  }

  public fetch(callback: (list: TADIREntry[]) => void) {
    Manager.request(
      "GET",
      this.c.cstring + "objects/DEVC/" + this.name + "/",
      (evt) => { callback(parse(evt)); });
  }
}