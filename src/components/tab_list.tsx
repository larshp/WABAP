import * as React from "react";
import * as Backend from "../backend/";
import * as Components from "./";
import {observer} from "mobx-react";

@observer
export class TabList extends React.Component<{state: Backend.State}, {}> {
  public render() {
      return (<div>
        {this.tabs(this.props.state.tablist)}
        </div>);
  }

  private tabs(t: Backend.TabList) {
    return (<div>
      {t.tabs.map(function(child) {
        return <Components.Tab tab={child}/>;
      })}
      </div>);
  }
}