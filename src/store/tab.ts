import {observable} from "mobx";

// todo, rename to TabText? or EditorText? or?
export class Tab {
  @observable public text = "";
  @observable public active = false;

  private mode = "";
  private textBuffer = "";
  private saveFunction: (string) => void;

// todo, instead of save, pass an object implementing a interface?
  constructor(text: string, buffer: string, mode: string, save: (string) => void) {
    this.text         = text;
    this.textBuffer   = buffer;
    this.mode         = mode;
    this.saveFunction = save;
  }

  public getBuffer(): string {
    return this.textBuffer;
  }

  public setBuffer(s: string) {
    this.textBuffer = s;
  }

  public getMode(): string {
    return this.mode;
  }

  public getSave() {
    return this.saveFunction;
  }
}