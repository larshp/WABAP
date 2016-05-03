import {observable} from "mobx";

export class Modal {
  @observable public connection: boolean;
  @observable public package: boolean;

  public constructor() {
    this.connection = false;
    this.package = false;
  }

  public showConnection() {
    this.connection = true;
  }

  public showPackage() {
    this.package = true;
  }
}