import * as Backend from "./";
import {observable} from "mobx";

export class State {
  @observable public tree = new Backend.Tree();
  @observable public tabs = new Backend.Tabs();
}