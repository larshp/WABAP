import * as React from "react";
import {observer} from "mobx-react";
import * as Store from "../../store/";
import * as Modal from "./";

@observer
export class Container extends React.Component<{}, {}> {
  public render() {
    let modal = Store.getStore().modal;
    return (
      <div>
      <Modal.Connection show={modal.connection} close={this.toggleConnection.bind(this)}/>
      <Modal.Package show={modal.package} con={modal.con} close={this.togglePackage.bind(this)}/>
      </div>);
  }

  private toggleConnection(): void {
    let modal = Store.getStore().modal;
    modal.connection = !modal.connection;
  }

  private togglePackage(): void {
    let modal = Store.getStore().modal;
    modal.package = !modal.package;
  }
}