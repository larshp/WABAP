import Manager from "./manager";
import { BackendObject } from "./";
import { Connection } from "../store/";

function parse(evt): string {
  return evt.target.responseText;
}

export class PrettyPrinter {

  private c: Connection;

  public constructor(c: Connection) {
    this.c = c;
  }

  public run(code: string, callback: (code: string) => void): void {
    Manager.post(
      this.c.cstring + "pretty_printer/",
      code,
      (evt) => { callback(parse(evt)); });
  }

}