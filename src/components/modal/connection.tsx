import * as React from "react";
import {observer} from "mobx-react";
import * as Store from "../../store/";
import {Style} from "./";
import Octicons from "../../misc/octicons";

@observer
export class Connection extends React.Component<{show: boolean, close: () => void}, {str: string, desc: string}> {

  public constructor() {
    super();
    this.state = {str: window.location.href, desc: "description"};
  }

  private clickOnline() {
    Store.getStore().connections.add(Store.ConnectionType.Online,
      this.state.str,
      this.state.desc);
    this.props.close();
  }

  private clickOffline() {
    Store.getStore().connections.add(Store.ConnectionType.Offline,
      this.state.str,
      this.state.desc);
    this.props.close();
  }

  private handleChange(event) {
    this.setState({str: event.target.value, desc: this.state.desc});
  }

  private handleChangeDesc(event) {
    this.setState({str: this.state.str, desc: event.target.value});
  }

  public render() {
      if (this.props.show === false) {
        return (<div />);
      } else {
        return (<div>
          <div style={Style.background}></div>
          <div style={Style.modal}>
            <a href="#" title="Close" style={Style.close} onClick={this.props.close.bind(this)}>{Octicons.x}</a>
            New Connection<br />
            <br />
            <input type="text" value={this.state.desc} onChange={this.handleChangeDesc.bind(this)} style={Style.input} /><br />
            <input type="submit" value="Offline" onClick={this.clickOffline.bind(this)} />
            <br />
            <br />
            <input type="text" value={this.state.str} onChange={this.handleChange.bind(this)} style={Style.input} /><br />
            <input type="submit" value="Online" onClick={this.clickOnline.bind(this)} />
          </div>
          </div>);
      }
  }
}