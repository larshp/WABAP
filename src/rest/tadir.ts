
function reqListener () {
  console.log(this.responseText);
}

export class TADIR {
  public static fetch(url: string) {
    let oReq = new XMLHttpRequest();
    oReq.addEventListener("load", reqListener);
    oReq.open("GET", url + "tadir/");
    oReq.send();
  }
}