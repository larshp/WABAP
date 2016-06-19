import {observable} from "mobx";

export class Notifications {
  @observable texts: string[];

  public constructor() {
    this.texts = [];

    this.add("Welcome to WABAP");
  }

  public add(text: string) {
    this.texts.push(text);

    setTimeout(this.pop.bind(this), 2000);
  }

  private pop() {
    this.texts.pop();
  }
}