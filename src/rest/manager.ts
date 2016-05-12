
function handleError(evt, callback: (evt) => void) {
  if (evt.target.status === 200) {
    callback(evt);
  } else {
    alert("REST call failed, status: " + evt.target.status);
  }
}

export default class Manager {
  public static request(method: string, url: string, callback: (evt) => void) {
    let oReq = new XMLHttpRequest();
    oReq.addEventListener("load", (evt) => { handleError(evt, callback); });
    oReq.open(method, url);
    oReq.send();
  }
}