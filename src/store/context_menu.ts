import {observable} from "mobx";

export interface ContextItem {
  description: string;
  callback: () => void;
}

export class ContextMenu {
  @observable public show: boolean;
  @observable public x: number;
  @observable public y: number;
  public list: ContextItem[];

  constructor() {
    this.show = false;
    this.list = undefined;
    this.x = 0;
    this.y = 0;
  }

  public display(e: MouseEvent, c: ContextItem[]): void {
    if (c.length === 0) {
      return;
    }
    this.show = true;
    this.list = c;
    this.x = e.clientX;
    this.y = e.clientY;
  }

  public hide(): void {
    this.show = false;
  }
}