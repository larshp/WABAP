import * as React from "react";

class Style {
  public static heading: {} = {
    display: "inline-block",
    fontStyle: "italic",
    cursor: "default",
    WebkitUserSelect: "none",
    MozUserSelect: "none",
    msUserSelect: "none",
    userSelect: "none",
  };

  public static item: {} = {
    display: "inline-block",
    cursor: "default",
    paddingLeft: "10px",
    WebkitUserSelect: "none",
    MozUserSelect: "none",
    msUserSelect: "none",
    userSelect: "none",
  };
}

export class TopMenu extends React.Component<{}, {}> {
  public render() {
    return (<div>
      <div style={Style.heading}>WABAP</div>
      <div style={Style.item}>asdf</div>
      </div>);
  }
}