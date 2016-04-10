import * as React from "react";
import * as Backend from "../backend/";
import {observer} from "mobx-react";

@observer
export class Tabs extends React.Component<{state: Backend.State}, {}> {
  public render() {
      return (<b>Hello wooorld {this.props.state.tabs.count}</b>);
  }
}