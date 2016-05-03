import * as React from "react";
import {observer} from "mobx-react";
import * as Store from "../../store/";
import * as Modal from "./";

@observer
export class Container extends React.Component<{}, {}> {
  public render() {
    let modal = Store.getStore().modal;
    return (<Modal.Connection show={modal.connection} close={this.toggleConnection.bind(this)}/>);
  }

  private toggleConnection(): void {
    let modal = Store.getStore().modal;
    modal.connection = !modal.connection;
  }
}