import * as React from "react";
import * as Modal from "./modal/";
import * as Store from "../store/";
import {observer} from "mobx-react";
import Octicons from "../misc/octicons";

class Style {
  public static icon: {} = {
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
export class TreeTop extends React.Component<{}, {}> {
  public render() {
    return (<div style={Style.icon} onClick={this.show.bind(this)}>{Octicons.radioTower}</div>);
  }

  private show(): void {
    Store.getStore().modal.showConnection();
  }
}