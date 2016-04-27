import * as React from "react";
import * as State from "../state/";
import * as Components from "./";
import {observer} from "mobx-react";

@observer
export class TabList extends React.Component<{state: State.Main}, {}> {
  public render() {
      return (<div>
        {this.tabs(this.props.state.tablist)}
        </div>);
  }

  private tabs(t: State.TabList) {
    let key = 1;

    return (<div>
      {t.tabs.map(function(child) {
        return <Components.Tab tab={child} key={key++} />;
      })}
      </div>);
  }
}