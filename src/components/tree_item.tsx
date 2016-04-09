import * as React from "react";
import { Provider } from "react-redux";
import * as Backend from "../backend/";

interface IProps {
  item: Backend.TreeItem;
}

export class TreeItem extends React.Component<IProps, {}> {

  public render(): React.ReactElement<Provider> {
    const style: {} = {
      textDecoration: "none",
      cursor: "default",
      display: "block",
    };

    let item = this.props.item;

    return (<li style={style}>
      {this.expander(item)}
      {this.icon(item)}
      {item.getText()}
      {this.children(item)}
      </li>);
  }

  private icon(item: Backend.TreeItem): React.ReactElement<Provider> {
    const style: {} = {
      fontFamily: "Octicons Regular",
      width: "18px",
      display: "inline-block",
      cursor: "default",
      verticalAlign: "top",
    };

    let content = "\uf016";

    return (<div style={style}>{content}</div>);
  }

  private expander(item: Backend.TreeItem): React.ReactElement<Provider> {
    const style: {} = {
      fontFamily: "Octicons Regular",
      width: "12px",
      display: "inline-block",
      verticalAlign: "top",
      cursor: "pointer",
    };

    let content = "";
    if (item.hasChildren()) {
      if (item.isExpanded()) {
        content = "\uf0a3";
      } else {
        content = "\uf078";
      }
    }

    return (<div style={style}>{content}</div>);
  }

  private children(item: Backend.TreeItem): React.ReactElement<Provider> {
    if (item.isExpanded() === false || item.hasChildren() === false) {
      return undefined;
    }

    let children = item.getChildren();

    const style: {} = {
      paddingLeft: "18px",
    };

    return (<ol style={style}>
      {children.map(function(child) {
        return <TreeItem item={child} />;
      })}
      </ol>);
  }
}