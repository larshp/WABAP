import * as State from "./";
import {observable} from "mobx";

export class Main {
  @observable public tree = new State.Tree();
  @observable public tablist = new State.TabList();
  @observable public editor = new State.Editor();

  private static state: Main = undefined;

  public static getState() {
    if (this.state === undefined) {
      this.state = new Main();
    }
    return this.state;
  }
}