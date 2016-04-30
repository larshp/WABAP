import * as React from "react";
import * as Modal from "./modal/";
import {observer} from "mobx-react";
import Octicons from "../misc/octicons";

class Style {
  public static floatrighticon: {} = {
    float: "right",
    position: "relative",
    fontFamily: "Octicons Regular",
    width: "20px",
    display: "inline-block",
    verticalAlign: "top",
    cursor: "pointer",
    WebkitUserSelect: "none",
    MozUserSelect: "none",
    msUserSelect: "none",
    userSelect: "none",
  };
}

@observer
export class TreeTop extends React.Component<{}, {popup: boolean}> {

  constructor() {
    super();
    this.state = {popup: false};
  }

  public render() {
    const content = Octicons.radioTower;

    return (<div>
      <Modal.Connection show={this.state.popup} close={this.toggleModalConnection.bind(this)}/>
      <div style={Style.floatrighticon} onClick={this.toggleModalConnection.bind(this)}>{content}</div>
      </div>);
  }

  private toggleModalConnection(): void {
    if (this.state.popup === false) {
      this.setState({popup: true});
    } else {
      this.setState({popup: false});
    }
  }
}