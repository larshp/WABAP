import * as Store from "../store/";

function parse(evt): TADIREntry[] {
  let json = JSON.parse(evt.target.responseText);
  let result: TADIREntry[] = [];
  for (let entry of json.DATA) {
    result.push(new TADIREntry(entry as ITADIREntry));
  }
  return result;
}

interface ITADIREntry {
  PGMID: string;
  OBJECT: string;
  OBJ_NAME: string;
  SRCSYSTEM: string;
  AUTHOR: string;
  DEVCLASS: string;
  MASTERLANG: string;
  DELFLAG: string;
}

export class TADIREntry implements ITADIREntry {
  public PGMID: string;
  public OBJECT: string;
  public OBJ_NAME: string;
  public SRCSYSTEM: string;
  public AUTHOR: string;
  public DEVCLASS: string;
  public MASTERLANG: string;
  public DELFLAG: string;

  public constructor(data: ITADIREntry) {
    this.PGMID = data.PGMID;
    this.OBJECT = data.OBJECT;
    this.OBJ_NAME = data.OBJ_NAME;
    this.SRCSYSTEM = data.SRCSYSTEM;
    this.AUTHOR = data.AUTHOR;
    this.DEVCLASS = data.DEVCLASS;
    this.MASTERLANG = data.MASTERLANG;
    this.DELFLAG = data.DELFLAG;
  }
}

export class TADIR {
  public static fetch(c: Store.Connection, callback: (list: TADIREntry[]) => void) {
    let oReq = new XMLHttpRequest();
    oReq.addEventListener("load", (evt) => { callback(parse(evt)); });
    oReq.open("GET", c.cstring + "tadir/");
    oReq.send();
  }
}