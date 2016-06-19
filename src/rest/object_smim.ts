import * as Store from "../store/";
import Manager from "./manager";

function parse(evt): SMIMEntry {
  let json = JSON.parse(evt.target.responseText);
  return new SMIMEntry(json.DATA as ISMIMEntry);
}

interface ISMIMEntry {
  URL: string;
  FOLDER: string;
}

export class SMIMEntry implements ISMIMEntry {
  public URL: string;
  public FOLDER: string;

  public constructor(data: ISMIMEntry) {
    this.URL = data.URL;
    this.FOLDER = data.FOLDER;
  }
}

export class ObjectSMIM {
  private c: Store.Connection;
  private name: string;

  public constructor(c: Store.Connection, name: string) {
    this.c = c;
    this.name = name;
  }

  public fetch(callback: (list: SMIMEntry) => void) {
    Manager.request(
      "GET",
      this.c.cstring + "objects/SMIM/" + this.name + "/",
      (evt) => { callback(parse(evt)); });
  }

  public content(callback: (data: string) => void ) {
    Manager.request(
      "GET",
      this.c.cstring + "objects/SMIM/" + this.name + "/content/",
      (evt) => { callback(evt.target.responseText); });
  }
}