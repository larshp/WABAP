import {observable} from "mobx";

export class Tab {
  @observable public text = "";
  @observable public active = false;

  private mode = "";
  private buffer = "";

  constructor(t: string, buffer: string, mode: string) {
    this.text = t;
    this.buffer = buffer;
    this.mode = mode;
  }

  public getBuffer(): string {
    return this.buffer;
  }

  public setBuffer(s: string) {
    this.buffer = s;
  }

  public getMode(): string {
    return this.mode;
  }
}