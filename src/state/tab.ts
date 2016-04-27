import {observable} from "mobx";

export class Tab {
  @observable public text = "";
  @observable public active = false;

  private buffer = "";

  constructor(t: string) {
    this.text = t;
    this.buffer = "REPORT " + t + ".\n* ABAP mode testing\nWRITE 'Hello world'."
  }

  public getBuffer(): string {
    return this.buffer;
  }

  public setBuffer(s: string) {
    this.buffer = s;
  }
}