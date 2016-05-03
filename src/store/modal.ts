import {observable} from "mobx";

export class Modal {
  @observable public connection: boolean;

  public constructor() {
    this.connection = false;
  }

  public showConnection() {
    this.connection = true;
  }
}