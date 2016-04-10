import * as React from "react";
import * as Backend from "../backend/";

interface IProps {
  key?: number;
  item: Backend.TreeItem;
}

export class TreeItem extends React.Component<IProps, {}> {

  public render() {

    const style: {} = {
      textDecoration: "none",
      cursor: "default",
      WebkitUserSelect: "none",
      MozUserSelect: "none",
      msUserSelect: "none",
      userSelect: "none",
      display: "block",
    };

    const inline: {} = {
      display: "inline-block",
    };

    let item = this.props.item;

    return (<li style={style}>
      {this.expander(item)}
      <div style={inline} onClick={this.clickItem.bind(this)}>
      {this.icon(item)}
      {item.getDescription()}
      </div>
      {this.children(item)}
      </li>);
  }

  private clickItem(): void {
    let item = this.props.item;

    if (item.getType() === "") {
      return;
    }

//    console.log("Editor open " + item.getType() + " " + item.getDescription());
  }

  private icon(item: Backend.TreeItem) {
    const style: {} = {
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

    return (<div style={style}>{content}</div>);
  }

  private clickExpand(): void {
    let item = this.props.item;

    item.toggleExpanded();

    this.setState(this.props);
  }

  private expander(item: Backend.TreeItem) {
    const style: {} = {
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

    let content = "";
    if (item.hasChildren()) {
      if (item.isExpanded()) {
        content = "\uf0a3";
      } else {
        content = "\uf078";
      }
    }

    return (<div style={style} onClick={this.clickExpand.bind(this)}>{content}</div>);
  }

  private children(item: Backend.TreeItem) {
    if (item.isExpanded() === false || item.hasChildren() === false) {
      return undefined;
    }

    let children = item.getChildren();

    const style: {} = {
      paddingLeft: "18px",
    };

    let i = 0;

    return (<ol style={style}>
      {children.map(function(child) {
        return <TreeItem key={i++} item={child} />;
      })}
      </ol>);
  }
}