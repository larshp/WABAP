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

@observer
export class Connection extends React.Component<{show: boolean, close: () => void}, {str: string, desc: string}> {

  public constructor() {
    super();
    this.state = {str: window.location.href, desc: "description"};
  }

  public render() {
    if (this.props.show === false) {
      return (<div />);
    }

    return (<div>
      <div style={Style.background}></div>
      <div style={Style.modal} onKeyDown={this.keyDown.bind(this)}>
        <a href="#" title="Close" style={Style.close} onClick={this.props.close.bind(this)}>{Octicons.x}</a>
        New Connection<br />
        <br />
        <input type="text"
          ref={focus} value={this.state.desc}
          onChange={this.handleChangeDesc.bind(this)}
          style={Style.input} />
        <br />
        <br />
        <input type="text"
          value={this.state.str}
          onChange={this.handleChange.bind(this)}
          style={Style.input} />
        <br />
        <input type="submit" value="Create" onClick={this.clickOnline.bind(this)} />
      </div>
      </div>);
  }

  private clickOnline() {
    Store.getStore().connections.add(
      Store.ConnectionType.Online,
      this.state.str,
      this.state.desc);
    this.props.close();
  }
/*
  private clickOffline() {
    Store.getStore().connections.add(
      Store.ConnectionType.Offline,
      this.state.str,
      this.state.desc);
    this.props.close();
  }
*/
  private handleChange(event) {
    this.setState({str: event.target.value, desc: this.state.desc});
  }

  private handleChangeDesc(event) {
    this.setState({str: this.state.str, desc: event.target.value});
  }

  private keyDown(e): void {
    switch (e.key) {
      case "Escape":
        this.props.close();
        break;
      default:
        return;
    }
  }
}