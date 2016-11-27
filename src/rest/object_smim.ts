import Manager from "./manager";
import { BackendObject } from "./";
import * as Store from "../store/";

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

class Meta {
  private obj: BackendObject;

  public constructor(obj: BackendObject) {
    this.obj = obj;
  }

  public get(callback: (list: SMIMEntry) => void) {
    Manager.get(
      this.obj.c.cstring + "objects/SMIM/" + this.obj.name + "/",
      (evt) => { callback(parse(evt)); });
  }
}

class Content {
  private obj: BackendObject;
  private url: string;

  public constructor(obj: BackendObject) {
    this.obj = obj;
    this.url = this.obj.c.cstring + "objects/SMIM/" + this.obj.name + "/content/";
  }

  public get(callback: (data: string) => void) {
    Manager.get(this.url, (evt) => { callback(evt.target.responseText); });
  }

  public save(data: string) {
    Manager.post(this.url, data, () => {Store.getStore().notifications.add("SMIM Saved"); });
  }
}

export class ObjectSMIM {
  private meta: Meta;
  private content: Content;

  public constructor(obj: BackendObject) {
    this.meta = new Meta(obj);
    this.content = new Content(obj);
  }

  public getMeta(): Meta {
    return this.meta;
  }

  public getContent(): Content {
    return this.content;
  }

}