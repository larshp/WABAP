import * as React from "react";
import * as Store from "../store/";
import {observer} from "mobx-react";
import Octicons from "../misc/octicons";

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
  item: Store.TreeItem;
}

@observer
export class TreeItem extends React.Component<IProps, {}> {

  public render() {
    let item = this.props.item;

    return (<li style={Style.li}>
      {this.expander(item)}
      <div style={Style.inline} onClick={this.clickItem.bind(this)} onContextMenu={this.contextMenu.bind(this)}>
      {this.icon(item)}
      {item.description}
      </div>
      {this.renderChildren(item)}
      </li>);
  }

  private contextMenu(e): void {
    e.preventDefault();
    Store.getStore().contextMenu.display(e, this.props.item.getContextList());
  }

  private clickItem(): void {
    this.props.item.click();
  }

  private icon(item: Store.TreeItem) {
    return (<div style={Style.icon}>{item.getIcon()}</div>);
  }

  private clickExpand(): void {
    this.props.item.toggleExpanded();
  }

  private expander(item: Store.TreeItem) {
    let content = "";
    if (item.children.length > 0) {
      if (item.expanded) {
        content = Octicons.chevronDown;
      } else {
        content = Octicons.chevronRight;
      }
    }

    return (<div style={Style.expander} onClick={this.clickExpand.bind(this)}>{content}</div>);
  }

  private renderChildren(item: Store.TreeItem) {
    if (item.expanded === false || item.children.length === 0) {
      return undefined;
    }

    let children = item.children;
    let i = 0;

    return (<ol style={Style.ol}>
      {children.map(function(child) {
        return <TreeItem key={i++} item={child} />;
      })}
      </ol>);
  }
}