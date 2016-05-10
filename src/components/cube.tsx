import * as React from "react";
import * as Components from "./";
import * as Store from "../store/";
import {observer} from "mobx-react";

class Style {
  public static running: {} = {
    animationPlayState: "running",
  };
  public static paused: {} = {
    animationPlayState: "paused",
  };
}

@observer
export class Cube extends React.Component<{}, {running: boolean}> {
  constructor() {
    super();
    this.state = {running: true};
  }

  public render() {
    let style = Style.running;
    if (!this.state.running) {
      style = Style.paused;
    }

    return (<div id="cube_container">
        <div id="cube" style={style} onClick={this.click.bind(this)}>
          <div>W</div>
          <div>A</div>
          <div>B</div>
          <div>A</div>
          <div>P</div>
          <div>.</div>
        </div>
      </div>);
  }

  private click(): void {
    this.setState({running: !this.state.running});
  }
}