import Manager from "./manager";
import { BackendObject } from "./";

function parse(evt): string {
  return evt.target.responseText;
}

class ABAP {
  private obj: BackendObject;

  public constructor(obj: BackendObject) {
    this.obj = obj;
  }

  public get(callback: (source: string) => void) {
    Manager.get(
      this.obj.c.cstring + "objects/PROG/" + this.obj.name + "/abap/",
      (evt) => { callback(parse(evt)); });
  }
}

export class ObjectPROG {
  private abap: ABAP;

  public constructor(obj: BackendObject) {
    this.abap = new ABAP(obj);
  }

  public getABAP() {
    return this.abap;
  }
}