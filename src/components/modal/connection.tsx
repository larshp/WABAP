import * as React from "react";
import {observer} from "mobx-react";
import * as Store from "../../store/";

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
	  color: "rgb(215, 218, 224)",
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
	  WebkitBorderRadius: "12px",
	  MozBorderRadius: "12px",
  	borderRadius: "12px",
  	MozBoxShadow: "1px 1px 3px #000",
  	WebkitBoxShadow: "1px 1px 3px #000",
  	boxShadow: "1px 1px 3px #000",
  };
}

@observer
export class Connection extends React.Component<{show: boolean, close: () => void}, {str: string, desc: string}> {

  public constructor() {
    super();
    this.state = {str: window.location.href, desc: "description"};
  }

  private clickOnline() {
    Store.getStore().connections.add(Store.ConnectionType.Online,
      this.state.str,
      this.state.desc);
    this.props.close();
  }

  private clickOffline() {
    Store.getStore().connections.add(Store.ConnectionType.Offline,
      this.state.str,
      this.state.desc);
    this.props.close();
  }

  private handleChange(event) {
    this.setState({str: event.target.value, desc: this.state.desc});
  }

  private handleChangeDesc(event) {
    this.setState({str: this.state.str, desc: event.target.value});
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
            <input type="text" value={this.state.desc} onChange={this.handleChangeDesc.bind(this)} style={Style.input} /><br />
            <input type="submit" value="Offline" onClick={this.clickOffline.bind(this)} />
            <br />
            <br />
            <input type="text" value={this.state.str} onChange={this.handleChange.bind(this)} style={Style.input} /><br />
            <input type="submit" value="Online" onClick={this.clickOnline.bind(this)} />
          </div>
          </div>);
      }
  }
}