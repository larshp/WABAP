import * as React from "react";
import { Provider } from "react-redux";
import * as Backend from "../backend/";

interface IProps {
  key?: number;
  item: Backend.TreeItem;
}

export class TreeItem extends React.Component<IProps, {}> {

  public render(): React.ReactElement<Provider> {
    const style: {} = {
      textDecoration: "none",
      cursor: "default",
      WebkitUserSelect: "none",
      MozUserSelect: "none",
      msUserSelect: "none",
      userSelect: "none",
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
      WebkitUserSelect: "none",
      MozUserSelect: "none",
      msUserSelect: "none",
      userSelect: "none",
      verticalAlign: "top",
    };

    let content = "\uf016";

    return (<div style={style}>{content}</div>);
  }

  private clickExpand(): void {
    let item = this.props.item;

    item.toggleExpanded();

    this.setState(this.props);
  }

  private expander(item: Backend.TreeItem): React.ReactElement<Provider> {
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

  private children(item: Backend.TreeItem): React.ReactElement<Provider> {
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