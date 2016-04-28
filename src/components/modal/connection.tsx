import * as React from "react";
import {observer} from "mobx-react";

@observer
export class Connection extends React.Component<{show: boolean}, {}> {
  public render() {
      if (this.props.show === false) {
        return (<div />);
      } else {
        return (<div>yes yes yes</div>);
      }
  }
}