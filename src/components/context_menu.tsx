import {observer} from "mobx-react";
import * as React from "react";
import * as Store from "../store/";

class Style {
  public static ul: {} = {
    marginTop: "0px",
    marginBottom: "0px",
    listStyleType: "none",
    paddingLeft: "0px",
  };
}

export class ContextMenuItem extends React.Component<{item: Store.ContextItem, key: number}, {hover: boolean}> {
  constructor() {
    super();
    this.state = {hover: false};
  }

  public render() {
    let background = "";
    if (this.state.hover) {
      background = "blue";
    }

    let hoverStyle = {
      backgroundColor: background,
      cursor: "default",
      WebkitUserSelect: "none",
      MozUserSelect: "none",
      msUserSelect: "none",
      userSelect: "none",
    };

    return (<li style={hoverStyle}
      onMouseEnter={this.toggleHover.bind(this)}
      onMouseLeave={this.toggleHover.bind(this)}>
      {this.props.item.description}</li>);
  }

  private toggleHover(): void {
    this.setState({hover: !this.state.hover})
  }
}

@observer
export class ContextMenu extends React.Component<{con: Store.ContextMenu}, {}> {
  public render() {
    if (this.props.con.show === false) {
      return (<div></div>);
    } else {
      const style = {
        top: this.props.con.y,
        left: this.props.con.x,
        position: "absolute",
        paddingLeft: "4px",
        paddingRight: "4px",
        paddingTop: "4px",
        paddingBottom: "4px",
        backgroundColor: "#F00",
        zIndex: 100,
      };

      return (<div style={style}>{this.renderList(this.props.con.list)}</div>);
    }
  }

  public renderList(list: Store.ContextItem[]) {
    let i = 0;

    return (<ul style={Style.ul}>
      {list.map(function(child) {
        return <ContextMenuItem key={i++} item={child} />
      })}
      </ul>);
  }
}