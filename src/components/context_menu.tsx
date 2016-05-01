import {observer} from "mobx-react";
import * as React from "react";
import * as State from "../state/";

@observer
export class ContextMenu extends React.Component<{con: State.ContextMenu}, {}> {
  public render() {
    if (this.props.con.show === false) {
      return (<div></div>);
    } else {
      const style = {
        top: this.props.con.y,
        left: this.props.con.x,
        position: "absolute",
        width: "100px",
        height: "100px",
        backgroundColor: "#F00",
        zIndex: 100,
      };

      return (<div style={style}>context menu</div>);
    }
  }
}