import Manager from "./manager";
import { BackendObject } from "./";

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
  private obj: BackendObject;

  public constructor(obj: BackendObject) {
    this.obj = obj;
  }

  public fetch(callback: (list: TADIREntry[]) => void) {
    Manager.get(
      this.obj.c.cstring + "objects/DEVC/" + this.obj.name + "/",
      (evt) => { callback(parse(evt)); });
  }
}