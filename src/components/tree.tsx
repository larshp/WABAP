import * as React from "react";
import * as Components from "./";
import * as Backend from "../backend/";
import {observer} from "mobx-react";

class Style {
  public static top: {} = {
    paddingLeft: "5px",
    marginTop: "5px",
  };
}

@observer
export class Tree extends React.Component<{state: Backend.State}, {}> {

  public render() {
    const root = this.props.state.tree.getRoot();

    return (<ol style={Style.top}>
      <Components.TreeItem item={root} tabs={this.props.state.tabs} />
      </ol>);
  }
}