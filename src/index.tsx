import "../typings/main.d.ts";
import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Components from "./components/";
import * as Store from "./store/";
import * as Modal from "./components/modal/";
import {observer} from "mobx-react";
import DevTools from "mobx-react-devtools";

class Style {
  public static wrap: {} = {
    width: "100%",
  };

  public static top: {} = {
    backgroundColor: "#292E36",
    height: "20px",
    lineHeight: "20px",
    overflow: "hidden",
    color: "rgb(215, 218, 224)",
  };

  public static tablist: {} = {
    float: "right",
    backgroundColor: "#000",
    height: "20px",
    width: "calc(100vw - 250px)",
  };

  public static editor: {} = {
    float: "right",
    backgroundColor: "#000",
    height: "calc(100vh - 40px)",
    width: "calc(100vw - 250px)",
  };

  public static tree: {} = {
    float: "left",
    width: "250px",
    backgroundColor: "#353b45",
    height: "calc(100vh - 20px)",
    color: "rgb(215, 218, 224)",
    whiteSpace: "nowrap",
  };

  public static clear: {} = {
    clear: "both",
  };
}

@observer
class Main extends React.Component<{}, {}> {
  public render() {
    return (<div style={Style.wrap} onClick={this.click.bind(this)}>
      <div style={Style.top}><Components.TopMenu /></div>
      <div style={Style.tree}><Components.Tree con={Store.getStore().connections} /></div>
      <div style={Style.tablist}><Components.TabList tablist={Store.getStore().tablist} /></div>
      <div style={Style.editor}><Components.CodeMirror editor={Store.getStore().editor} /></div>
      <div><Components.ContextMenu con={Store.getStore().contextMenu} /></div>
      <DevTools />
      <div><Modal.Container /></div>
      <div style={Style.clear}></div>
      </div>);
  }

  private click(): void {
    Store.getStore().contextMenu.hide();
  }
}

Store.getStore(); // make sure to initialize the store before starting the app
ReactDOM.render(<Main />, document.getElementById("app"));