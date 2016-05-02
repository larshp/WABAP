import * as React from "react";
import {observer} from "mobx-react";
import * as Store from "../store/";

@observer
export class CodeMirror extends React.Component<{editor: Store.Editor}, {}> {
  public componentDidMount() {
    this.props.editor.initEditor();
  }

  public render() {
    return (<form><textarea id="code" name="code"></textarea></form>);
  }
}