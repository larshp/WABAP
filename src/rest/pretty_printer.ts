import Manager from "./manager";
import * as Store from "../store/";

function parse(evt): string {
  return evt.target.responseText;
}

export class PrettyPrinter {

  private c: Store.Connection;

  public constructor(c: Store.Connection) {
    this.c = c;
  }

  public run(code: string, callback: (code: string) => void): void {
    Manager.post(
      this.c.cstring + "pretty_printer/",
      code,
      (evt) => {
        callback(parse(evt));
        Store.getStore().notifications.add("Pretty printed");
      });
  }

}