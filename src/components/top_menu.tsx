import * as React from "react";
import { Provider } from "react-redux";

export class TopMenu extends React.Component<{}, {}> {

  public render(): React.ReactElement<Provider> {
    const heading: {} = {
      display: "inline-block",
      fontStyle: "italic",
      cursor: "default",
      WebkitUserSelect: "none",
      MozUserSelect: "none",
      msUserSelect: "none",
      userSelect: "none",
    };

    const item: {} = {
      display: "inline-block",
      cursor: "default",
      paddingLeft: "10px",
      WebkitUserSelect: "none",
      MozUserSelect: "none",
      msUserSelect: "none",
      userSelect: "none",
    };

    return (<div>
      <div style={heading}>WABAP</div>
      <div style={item}>File</div>
      <div style={item}>About</div>
      </div>);
  }
}