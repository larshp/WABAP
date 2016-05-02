import * as Store from "./";
import {observable} from "mobx";

export class Main {
  private static store: Main = undefined;

  @observable public tablist = new Store.TabList();
  @observable public editor = new Store.Editor();
  @observable public connections = new Store.Connections();
  @observable public contextMenu = new Store.ContextMenu();

// todo, just have this as a globla function instead?
  public static getStore() {
    if (this.store === undefined) {
      this.store = new Main();
    }
    return this.store;
  }
}