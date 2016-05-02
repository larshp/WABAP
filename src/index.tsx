import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Components from "./components/";
import * as Store from "./store/";
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
  };

  public static clear: {} = {
    clear: "both",
  };
}

@observer
class Main extends React.Component<{state: Store.Main}, {}> {
  public render() {
    return (<div style={Style.wrap} onClick={this.click.bind(this)}>
      <div style={Style.top}><Components.TopMenu /></div>
      <div style={Style.tree}><Components.Tree state={this.props.state} /></div>
      <div style={Style.tablist}><Components.TabList state={this.props.state} /></div>
      <div style={Style.editor}><Components.CodeMirror editor={this.props.state.editor} /></div>
      <div><Components.ContextMenu con={this.props.state.contextMenu} /></div>
      <div style={Style.clear}></div>
      </div>);
  }

  private click(): void {
    this.props.state.contextMenu.hide();
  }
}

ReactDOM.render(<Main state={Store.Main.getStore()} />, document.getElementById("app"));