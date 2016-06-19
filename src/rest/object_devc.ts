import Manager from "./manager";
import { BackendObject } from "./";

function parse(evt): DEVCEntry {
  let json = JSON.parse(evt.target.responseText);

  let result = new DEVCEntry();

  for (let sub of json.DATA.SUB) {
    result.sub.push(sub);
  }

  for (let entry of json.DATA.CONTENTS) {
    result.tadir.push(new TADIREntry(entry as ITADIREntry));
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

export class DEVCEntry {
  public sub: string[];
  public tadir: TADIREntry[];

  public constructor() {
    this.sub = [];
    this.tadir = [];
  }
}

export class ObjectDEVC {
  private obj: BackendObject;

  public constructor(obj: BackendObject) {
    this.obj = obj;
  }

  public fetch(callback: (devc: DEVCEntry) => void) {
    Manager.get(
      this.obj.c.cstring + "objects/DEVC/" + this.obj.name + "/",
      (evt) => { callback(parse(evt)); });
  }
}