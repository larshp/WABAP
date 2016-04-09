import * as React from "react";
import { Provider } from "react-redux";

export class TopMenu extends React.Component<{}, {}> {

  public render(): React.ReactElement<Provider> {
    const menuitem: {} = {
      display: "inline-block",
      cursor: "default",
      WebkitUserSelect: "none",
      MozUserSelect: "none",
      msUserSelect: "none",
      userSelect: "none",
    };

    return (<div><i>WABAP</i> -
      <div style={menuitem}>File</div>
      <div style={menuitem}>About</div>
      <div style={menuitem}>Rebuild menu</div>
      </div>);
  }
}