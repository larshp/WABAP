import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import * as Components from './';
import * as Backend from "../backend/";

interface Props {
  tree: Backend.Tree;
}

export class Tree extends React.Component<Props, {}> {

  public render(): React.ReactElement<Provider> {
    const top: {} = {
      paddingLeft: "5px",
      marginTop: "5px"
    };

    let root = this.props.tree.getRoot();

    return (<ol style={top}>
      <Components.TreeItem item={root} />
      </ol>);
  }
}