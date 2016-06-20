import "../typings/index.d.ts";
import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Components from "./components/";
import * as Store from "./store/";
import * as Modal from "./components/modal/";
import {observer} from "mobx-react";
import {observable} from "mobx";
import DevTools from "mobx-react-devtools";

class Style {
  public static wrap: {} = {
    width: "100%",
  };

  public static clear: {} = {
    clear: "both",
  };
}

@observer
class Main extends React.Component<{}, {}> {

  @observable private treewidth = "250px";
  private dragStart = 0;
  private originalWidth = 0;

  public render() {

    let topheight = "20px";
    let tabheight = "20px";
    let adjwidth = "5px";
    let fontcolor = "rgb(215, 218, 224)";

    let top = {
      backgroundColor: "#292E36",
      height: topheight,
      lineHeight: topheight,
      overflow: "hidden",
      color: fontcolor,
    };

    let tree = {
      float: "left",
      width: this.treewidth,
      backgroundColor: "#353b45",
      height: "calc(100vh - " + topheight + ")",
      color: fontcolor,
      whiteSpace: "nowrap",
      overflow: "auto",
    };

    let adjust = {
      float: "left",
      width: adjwidth,
      backgroundColor: "#353b45",
      height: "calc(100vh - " + topheight + ")",
      color: fontcolor,
      whiteSpace: "nowrap",
      overflow: "hidden",
      cursor: "ew-resize",
    };

    let tablist = {
      float: "right",
      backgroundColor: "#000",
      height: tabheight,
      width: "calc(100vw - " + this.treewidth + " - " + adjwidth + ")",
    };

    let editor = {
      float: "right",
      backgroundColor: "#000",
      height: "calc(100vh - " + topheight + " - " + tabheight + ")",
      width: "calc(100vw - " + this.treewidth + " - " + adjwidth + ")",
    };

    return (<div style={Style.wrap} onClick={this.click.bind(this)}>
      <div style={top}><Components.TopMenu /></div>

      <div style={tree}><Components.Tree con={Store.getStore().connections} /></div>

      <div style={adjust} draggable="true"
        onDrag={this.onDrag.bind(this)}
        onDragStart={this.onDragStart.bind(this)}>
      </div>

      <div style={tablist}><Components.TabList tablist={Store.getStore().tablist} /></div>
      <div style={editor}><Components.CodeMirror editor={Store.getStore().editor} /></div>

      <DevTools position={{ bottom: 0, right: 20 }} />
      <Components.ContextMenu con={Store.getStore().contextMenu} />
      <Modal.Container />
      <Components.Notifications n={Store.getStore().notifications} />
      <div style={Style.clear}></div>
      </div>);
  }

  private click(): void {
    Store.getStore().contextMenu.hide();
  }

  private onDrag(e): void {
    if (e.clientX !== 0) {
      let diff = e.clientX - this.dragStart;
      let newwidth = this.originalWidth + diff;
      if (newwidth < 100) {
        newwidth = 100;
      }
      this.treewidth = newwidth + "px";
    }
  }

  private onDragStart(e): void {
    this.dragStart = e.clientX;
    this.originalWidth = parseInt( this.treewidth, 10 );
  }
}

Store.getStore(); // make sure to initialize the store before starting the app
ReactDOM.render(<Main />, document.getElementById("app"));