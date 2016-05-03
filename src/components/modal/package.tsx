import * as React from "react";
import {observer} from "mobx-react";
import * as Store from "../../store/";
import {Style} from "./";
import Octicons from "../../misc/octicons";

function focus(input) {
  if (input) {
    input.focus();
  }
}

// todo, super class for modal dialogs?

@observer
export class Package extends React.Component<{show: boolean, con: Store.Connection, close: () => void}, {str: string}> {

  public constructor() {
    super();
    this.state = {str: "$TMP"};
  }

  public render() {
    if (this.props.show === false) {
      return (<div />);
    }

    return (<div>
      <div style={Style.background}></div>
      <div style={Style.modal} onKeyDown={this.keyDown.bind(this)}>
        <a href="#" title="Close" style={Style.close} onClick={this.props.close.bind(this)}>{Octicons.x}</a>
        Open Package<br />
        <br />
        <input
          ref={focus}
          type="text"
          value={this.state.str}
          onChange={this.handleChange.bind(this)}
          style={Style.input} />
        <br />
        <input type="submit" value="Open" onClick={this.click.bind(this)} />
      </div>
      </div>);
  }

  private click() {
    this.props.con.addPackage(this.state.str);
    this.props.close();
  }

  private handleChange(event) {
    this.setState({str: event.target.value});
  }

  private keyDown(e): void {
    switch (e.key) {
      case "Escape":
        this.props.close();
        break;
      case "Enter":
        this.click();
        break;
      default:
        return;
    }
  }
}