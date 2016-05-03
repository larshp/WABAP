import * as Store from "./";
import {observable} from "mobx";

class Main {
  @observable public tablist: Store.TabList;
  @observable public editor: Store.Editor;
  @observable public connections: Store.Connections;
  @observable public contextMenu: Store.ContextMenu;
  @observable public modal: Store.Modal;

  constructor() {
    this.tablist = new Store.TabList();
    this.editor = new Store.Editor();
    this.connections = new Store.Connections();
    this.contextMenu = new Store.ContextMenu();
    this.modal = new Store.Modal();
  }
}

let store: Main = undefined;

export function getStore() {
  if (store === undefined) {
    store = new Main();
  }
  return store;
}