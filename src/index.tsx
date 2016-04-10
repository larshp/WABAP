import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Components from "./components/";
import * as Backend from "./backend/";
import {observable} from "mobx";
import {observer} from "mobx-react";
import DevTools from "mobx-react-devtools";

/*
<div class="wrap">
  <div class="topmenu"><i>WABAP</i> -
    <div class="menu-item">File</div>
    <div class="menu-item">About</div>
    <div class="menu-item">Rebuild menu</div>
  </div>

  <div class="floatleft">
  <ol class="list-top">
    <li class="list-item expanded">
      <div class="list-content directory">$TMP</div>
      <ol class="list-sub">
        <li class="list-item empty">
          <div class="list-content file">ZFOOBAR</div>
        </li>
        <li class="list-item empty">
          <div class="list-content file">ZASDF</div>
        </li>
        <li class="list-item expanded">
          <div class="list-content directory">Programs</div>
          <ol class="list-sub">
            <li class="list-item empty">
              <div class="list-content file">ZFOOBAR</div>
            </li>
            <li class="list-item empty">
              <div class="list-content file">ZASDF</div>
            </li>
          </ol>
        </li>
        <li class="list-item collapsed">
          <div class="list-content directory">Data Elements</div>
        </li>
        <li class="list-item collapsed">
          <div class="list-content directory">Domains</div>
        </li>
      </ol>
    </li>
  </ol>
  </div>

<div class="floatright"></div>
<div style="clear: both;"></div>
*/

class State {
  @observable public btree = new Backend.Tree();
}

const state = new State();

@observer
class Main extends React.Component<{state: State}, {}> {
  public render() {
    const wrap: {} = {
      width: "100%",
    };

    const top: {} = {
      backgroundColor: "#292E36",
      height: "20px",
      lineHeight: "20px",
      overflow: "hidden",
      color: "rgb(215, 218, 224)",
    };

    const tree: {} = {
      float: "left",
      width: "20%",
      backgroundColor: "#353b45",
      height: "calc(100vh - 20px)",
      color: "rgb(215, 218, 224)",
    };

    const editor: {} = {
      float: "right",
      backgroundColor: "#000",
      height: "calc(100vh - 20px)",
      width: "80%",
    };

    const clear: {} = {
      clear: "both",
    };

    return (<div style={wrap}>
      <div style={top}><Components.TopMenu /></div>
      <div style={tree}><Components.Tree tree={state.btree} /></div>
      <div style={editor}>Hello world</div>
      <div style={clear}></div>
      <DevTools />
      </div>);
  }
}

ReactDOM.render(<Main state={state} />, document.getElementById("app"));