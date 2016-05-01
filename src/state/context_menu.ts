import {observable} from "mobx";

export class ContextMenu {
  @observable public show: boolean;
  @observable public x: number;
  @observable public y: number;

  constructor() {
    this.show = false;
    this.x = 0;
    this.y = 0;
  }

  public display(x: number, y: number) {
    this.show = true;
    this.x = x;
    this.y = y;
  }

  public hide() {
    this.show = false;
  }
}