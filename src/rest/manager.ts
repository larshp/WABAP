
function handleError(evt, callback?: (evt) => void) {
  if (evt.target.status === 200) {
    if (callback) {
      callback(evt);
    }
  } else {
    alert("REST call failed, status: " + evt.target.status);
  }
}

export default class Manager {
  public static get(url: string, callback: (evt) => void) {
    let oReq = new XMLHttpRequest();
    oReq.addEventListener("load", (evt) => { handleError(evt, callback); });
    oReq.open("GET", url);
    oReq.send();
  }

  public static post(url: string, data: string) {
    let oReq = new XMLHttpRequest();
    oReq.addEventListener("load", (evt) => { handleError(evt); });
    oReq.open("POST", url);
    oReq.send(data);
  }
}