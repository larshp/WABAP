export class Style {
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