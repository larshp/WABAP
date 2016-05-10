import {observable} from "mobx";
import * as Store from "./";

export class TabList {
  @observable public tabs: Store.Tab[] = [];

  private active: Store.Tab = undefined;

  public add(t: Store.TreeItem, source: string) {
    let text = t.description;

// look to see if it is already there
// todo, also compare by object type?
    for (let tab of this.tabs) {
      if (tab.text === text) {
        this.setActive(tab);
        return;
      }
    }

    let tab = new Store.Tab(text, source);
    this.tabs.push(tab);
    this.setActive(tab);
  }

  public close(t: Store.Tab) {
    this.tabs = this.tabs.filter((item) => { return item.text !== t.text; });

    if (this.tabs.length === 0) {
// last tab is closed
      Store.getStore().editor.hide();
      this.active = undefined;
    } else if (t === this.active) {
// active tab is closed
      this.setActive(this.tabs[0]);
    }
  }

  public setActive(t: Store.Tab) {
    let editor = Store.getStore().editor;

    if (this.active !== undefined) {
      this.active.active = false;
      this.active.setBuffer(editor.getValue());
    }

    this.active = t;
    t.active = true;
    this.active = t;

    editor.open(t.getBuffer());
  }
}