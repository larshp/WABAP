import * as React from "react";
import {observer} from "mobx-react";
import * as State from "../state/";

@observer
export class CodeMirror extends React.Component<{editor: State.Editor}, {}> {
  public componentDidMount() {
    this.props.editor.initEditor();
  }

  public render() {
    return (<form><textarea id="code" name="code"></textarea></form>);
  }
}