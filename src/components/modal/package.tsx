import * as React from "react";
import {observer} from "mobx-react";
import * as Store from "../../store/";
import {Style} from "./";
import Octicons from "../../misc/octicons";

@observer
export class Package extends React.Component<{show: boolean, close: () => void}, {str: string}> {

  public constructor() {
    super();
    this.state = {str: "$TMP"};
  }

  private click() {
    alert("todo, do something");
    this.props.close();
  }

  private handleChange(event) {
    this.setState({str: event.target.value});
  }

  public render() {
      if (this.props.show === false) {
        return (<div />);
      } else {
        return (<div>
          <div style={Style.background}></div>
          <div style={Style.modal}>
            <a href="#" title="Close" style={Style.close} onClick={this.props.close.bind(this)}>{Octicons.x}</a>
            Open Package<br />
            <br />
            <input type="text" value={this.state.str} onChange={this.handleChange.bind(this)} style={Style.input} /><br />
            <input type="submit" value="Open" onClick={this.click.bind(this)} />
          </div>
          </div>);
      }
  }
}