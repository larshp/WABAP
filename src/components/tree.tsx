import * as React from "react";
import * as Components from "./";
import * as State from "../state/";
import {observer} from "mobx-react";

class Style {
  public static top: {} = {
    paddingLeft: "5px",
    marginTop: "5px",
  };
}

@observer
export class Tree extends React.Component<{state: State.Main}, {}> {

  public render() {
    const root = this.props.state.tree.getRoot();

    return (<ol style={Style.top}>
      <Components.TreeItem item={root} />
      </ol>);
  }
}