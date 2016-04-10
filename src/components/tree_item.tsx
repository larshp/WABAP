import * as React from "react";
import * as Backend from "../backend/";
import {observer} from "mobx-react";

class Style {
  public static li: {} = {
    textDecoration: "none",
    cursor: "default",
    WebkitUserSelect: "none",
    MozUserSelect: "none",
    msUserSelect: "none",
    userSelect: "none",
    display: "block",
  };

  public static inline: {} = {
    display: "inline-block",
  };

  public static icon: {} = {
    fontFamily: "Octicons Regular",
    width: "18px",
    display: "inline-block",
    cursor: "default",
    WebkitUserSelect: "none",
    MozUserSelect: "none",
    msUserSelect: "none",
    userSelect: "none",
    verticalAlign: "top",
  };

  public static expander: {} = {
    fontFamily: "Octicons Regular",
    width: "12px",
    display: "inline-block",
    verticalAlign: "top",
    cursor: "pointer",
    WebkitUserSelect: "none",
    MozUserSelect: "none",
    msUserSelect: "none",
    userSelect: "none",
  };

  public static ol: {} = {
    paddingLeft: "18px",
  };
}

interface IProps {
  key?: number;
  item: Backend.TreeItem;
  tabs: Backend.Tabs;
}

@observer
export class TreeItem extends React.Component<IProps, {}> {

  public render() {
    let item = this.props.item;

    return (<li style={Style.li}>
      {this.expander(item)}
      <div style={Style.inline} onClick={this.clickItem.bind(this)}>
      {this.icon(item)}
      {item.getDescription()}
      </div>
      {this.children(item, this.props.tabs)}
      </li>);
  }

  private clickItem(): void {
    if (this.props.item.getType() === "") {
      return;
    }

    this.props.tabs.addTab();
  }

  private icon(item: Backend.TreeItem) {
    let content = "";
    switch (item.getType()) {
      case "PROG":
        content = "\uf011";
        break;
      case "DTEL":
        content = "\uf06d";
        break;
      case "DOMA":
        content = "\uf099";
        break;
      default:
        content = "\uf016";
        break;
    }

    return (<div style={Style.icon}>{content}</div>);
  }

  private clickExpand(): void {
    this.props.item.toggleExpanded();
  }

  private expander(item: Backend.TreeItem) {
    let content = "";
    if (item.hasChildren()) {
      if (item.expanded) {
        content = "\uf0a3";
      } else {
        content = "\uf078";
      }
    }

    return (<div style={Style.expander} onClick={this.clickExpand.bind(this)}>{content}</div>);
  }

  private children(item: Backend.TreeItem, tabs: Backend.Tabs) {
    if (item.expanded === false || item.hasChildren() === false) {
      return undefined;
    }

    let children = item.getChildren();
    let i = 0;

    return (<ol style={Style.ol}>
      {children.map(function(child) {
        return <TreeItem key={i++} item={child} tabs={tabs} />;
      })}
      </ol>);
  }
}