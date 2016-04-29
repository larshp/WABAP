import * as React from "react";
import * as State from "../state/";
import {observer} from "mobx-react";

class Style {
  public static inline: {} = {
    display: "inline-block",
  };

  public static tabActive: {} = {
    display: "inline-block",
    backgroundColor: "#353b45",
    marginLeft: "10px",
    color: "rgb(215, 218, 224)",
    fontWeight: "bold",
    cursor: "default",
    WebkitUserSelect: "none",
    MozUserSelect: "none",
    msUserSelect: "none",
    userSelect: "none",
  };

  public static tabInactive: {} = {
    display: "inline-block",
    backgroundColor: "#353b45",
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
export class Tab extends React.Component<{tab: State.Tab, key?: number}, {}> {

  public render() {
    let style;
    if (this.props.tab.active === true) {
      style = Style.tabActive;
    } else {
      style = Style.tabInactive;
    }

    return (
      <div style={Style.inline}>
      <div style={style} onClick={this.clickItem.bind(this)}>{this.props.tab.text}</div>
      {this.icon()}
      </div>);
  }

  private icon() {
    let content = "\uf081";

    return (<div style={Style.icon} onClick={this.clickClose.bind(this)}>{content}</div>);
  }

  private clickItem(): void {
    State.Main.getState().tablist.setActive(this.props.tab);
  }

  private clickClose(): void {
    State.Main.getState().tablist.close(this.props.tab);
  }
}