import {observable} from "mobx";

export class Tab {
  @observable public text = "";
  @observable public active = false;

  private buffer = "";

  constructor(t: string, buffer: string) {
    this.text = t;
    this.buffer = buffer;
  }

  public getBuffer(): string {
    return this.buffer;
  }

  public setBuffer(s: string) {
    this.buffer = s;
  }
}