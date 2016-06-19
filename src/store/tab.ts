import {observable} from "mobx";

// todo, rename to TabText? or EditorText? or?
export class Tab {
  @observable public text = "";
  @observable public active = false;

  private mode = "";
  private buffer = "";
  private save: (string) => void;

// todo, instead of save, pass an object implementing a interface?
  constructor(text: string, buffer: string, mode: string, save: (string) => void) {
    this.text = text;
    this.buffer = buffer;
    this.mode = mode;
    this.save = save;
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

  public getSave() {
    return this.save;
  }
}