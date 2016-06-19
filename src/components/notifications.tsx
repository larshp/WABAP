import * as React from "react";
import * as Components from "./";
import * as Store from "../store/";
import {observer} from "mobx-react";

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
      {this.props.n.texts.map((text) => {
        return <Notification text={text} key={i++} />;
      })}
      </div>);
  }
}