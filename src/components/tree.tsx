import * as React from "react";
import * as Components from "./";
import * as Backend from "../backend/";

interface IProps {
  tree: Backend.Tree;
}

export class Tree extends React.Component<IProps, {}> {

  public render() {
    const top: {} = {
      paddingLeft: "5px",
      marginTop: "5px",
    };

    let root = this.props.tree.getRoot();

    return (<ol style={top}>
      <Components.TreeItem item={root} />
      </ol>);
  }
}