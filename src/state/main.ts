import * as State from "./";
import {observable} from "mobx";

export class Main {
  private static state: Main = undefined;

  @observable public tablist = new State.TabList();
  @observable public editor = new State.Editor();
  @observable public connections = new State.Connections();

  public static getState() {
    if (this.state === undefined) {
      this.state = new Main();
    }
    return this.state;
  }
}