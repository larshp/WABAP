import {observable} from "mobx";
import * as State from "./";

export class TabList {
  @observable public tabs: State.Tab[] = [];

  private active: State.Tab = undefined;

  public add(t: State.TreeItem) {
    let text = t.getDescription();

// look to see if it is already there
    for (let tab of this.tabs) {
      if (tab.text === text) {
        this.setActive(tab);
        return;
      }
    }

    let tab = new State.Tab(text);
    this.tabs.push(tab);
    this.setActive(tab);
  }

  public close(t: State.Tab) {
    this.tabs = this.tabs.filter((item) => { return item.text != t.text; });

    if (this.tabs.length === 0) {
// last tab is closed
      State.Main.getState().editor.hide();
      this.active = undefined;
    } else if (t == this.active) {
// active tab is closed
      this.setActive(this.tabs[0]);
    }
  }

  public setActive(t: State.Tab) {
    let editor = State.Main.getState().editor;

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