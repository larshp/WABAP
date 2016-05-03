import {observable} from "mobx";
import * as Store from "./";

export class Modal {
  @observable public connection: boolean;
  @observable public package: boolean;
  @observable public con: Store.Connection;

  public constructor() {
    this.connection = false;
    this.package = false;
  }

  public showConnection() {
    this.connection = true;
  }

  public openPackage(c: Store.Connection) {
    this.con = c;
    this.package = true;
  }
}