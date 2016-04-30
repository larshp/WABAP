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
    let i = 0;

    return (<div>
      <Components.TreeTop />
      <ol style={Style.top}>
      {this.props.state.connections.list.map((child) => {
        return <Components.TreeItem key={i++} item={child} />;
      })}
      </ol>
      </div>);
  }
}