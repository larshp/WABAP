import * as React from "react";
import {observer} from "mobx-react";

class Style {
  public static background: {} = {
	  position: "fixed",
	  top: "0px",
	  left: "0px",
	  width: "100vw",
	  height: "100vh",
	  background: "#000",
	  zIndex: "99",
	  opacity: "0.6",
	  pointerEvents: "auto",
  };

  public static modal: {} = {
    position: "absolute",
	  width: "400px",
	  top: "50px",
	  left: "100px",
	  padding: "5px 20px 10px 20px",
	  borderRadius: "10px",
	  background: "#353b45",
	  zIndex: "100",
  };

  public static input: {} = {
	  width: "400px",
  };

  public static close: {} = {
    fontFamily: "Octicons Regular",
	  background: "#606061",
	  color: "#FFFFFF",
	  lineHeight: "25px",
	  position: "absolute",
	  right: "-12px",
	  textAlign: "center",
	  top: "-10px",
	  width: "24px",
	  textDecoration: "none",
	  fontWeight: "bold",
	  webkitBorderRadius: "12px",
	  mozBorderRadius: "12px",
  	borderRadius: "12px",
  	mozBoxShadow: "1px 1px 3px #000",
  	webkitBoxShadow: "1px 1px 3px #000",
  	boxShadow: "1px 1px 3px #000",
  };
}

@observer
export class Connection extends React.Component<{show: boolean, close: () => void}, {}> {

  private clickSAP() {
    this.props.close();
  }

  private clickMongo() {
    this.props.close();
  }

  private clickOffline() {
    this.props.close();
  }

  public render() {

      const content = "\uf081";

      if (this.props.show === false) {
        return (<div />);
      } else {
        return (<div>
          <div style={Style.background}></div>
          <div style={Style.modal}>
            <a href="#" title="Close" style={Style.close} onClick={this.props.close.bind(this)}>{content}</a>
            New Connection<br />
            <br />
            <input type="text" value="mongodb://<dbuser>:<dbpassword>@<host>:<port>/<db>" style={Style.input} /><br />
            <input type="submit" value="SAP" onClick={this.clickSAP.bind(this)} />
            <input type="submit" value="MongoDB" onClick={this.clickMongo.bind(this)} />
            <input type="submit" value="Offline" onClick={this.clickOffline.bind(this)} />
          </div>
          </div>);
      }
  }
}