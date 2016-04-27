import * as React from "react";
import * as Backend from "../backend/";
import {observer} from "mobx-react";

class Style {
  public static inline: {} = {
    display: "inline-block",
  };

  public static tab: {} = {
    display: "inline-block",
    backgroundColor: "#F00",
    marginLeft: "10px",
    color: "rgb(215, 218, 224)",
    cursor: "default",
    WebkitUserSelect: "none",
    MozUserSelect: "none",
    msUserSelect: "none",
    userSelect: "none",
  };

  public static icon: {} = {
    display: "inline-block",
    fontFamily: "Octicons Regular",
    width: "12px",
    color: "rgb(215, 218, 224)",
    verticalAlign: "middle",
    cursor: "pointer",
    WebkitUserSelect: "none",
    MozUserSelect: "none",
    msUserSelect: "none",
    userSelect: "none",
  };
}

@observer
export class Tab extends React.Component<{tab: Backend.Tab}, {}> {

  public render() {
      return (
        <div style={Style.inline}>
        <div style={Style.tab} onClick={this.clickItem.bind(this)}>{this.props.tab.text}</div>
        {this.icon()}
        </div>);
  }

  private icon() {
    let content = "\uf081";

    return (<div style={Style.icon} onClick={this.clickClose.bind(this)}>{content}</div>);
  }

  private clickItem(): void {
    alert("click " + this.props.tab.text);
  }

  private clickClose(): void {
    alert("close " + this.props.tab.text);
  }
}