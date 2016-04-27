import * as React from "react";
import {observer} from "mobx-react";

@observer
export class CodeMirror extends React.Component<{}, {}> {
  public render() {
      return (<form><textarea id="code" name="code"></textarea></form>);
  }
}