import {observable} from "mobx";
import * as Store from "./";

export class TabList {
  @observable public tabs: Store.Tab[] = [];

  private active: Store.Tab = undefined;

  public add(t: Store.Tab) {
// look to see if it is already there
// todo, also compare by object type? and "sub" types?
    for (let existing of this.tabs) {
      if (existing.text === t.text) {
        this.setActive(existing);
        return;
      }
    }

    this.tabs.push(t);
    this.setActive(t);
  }

  public close(t: Store.Tab) {
    this.tabs = this.tabs.filter((item) => { return item.text !== t.text; });

    if (this.tabs.length === 0) {
      this.closeLastTab();
    } else if (t === this.active) {
      this.closeActiveTab();
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

    editor.open(t.getBuffer(), t.getMode());
  }

  public getActive(): Store.Tab {
    return this.active;
  }

  private closeActiveTab() {
    this.setActive(this.tabs[0]);
  }

  private closeLastTab() {
    Store.getStore().editor.hide();
    this.active = undefined;
  }
}