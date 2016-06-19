import * as React from "react";
import * as Components from "./";
import * as Store from "../store/";
import {observer} from "mobx-react";
import * as Transition from "react-addons-css-transition-group";

class Style {
  public static notification: {} = {
    padding: "5px 20px 5px 20px",
    color: "black",
    borderRadius: "10px",
    marginBottom: "10px",
    background: "#00C855",
  };

  public static topright: {} = {
    position: "absolute",
    top: "10px",
    right: "10px",
    zIndex: "100",
  };
}

@observer
class Notification extends React.Component<{text: string}, {}> {
  public render() {
    return (<div style={Style.notification}>{this.props.text}</div>);
  }
}

@observer
export class Notifications extends React.Component<{n: Store.Notifications}, {}> {
  public render() {
    let i = 0;

    return (<div style={Style.topright}>
      <Transition transitionName="fade" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
      {this.props.n.texts.map((text) => {
        return <Notification text={text} key={i++} />;
      })}
      </Transition>
      </div>);
  }
}