/* global CodeMirror */
var editor = CodeMirror.fromTextArea(document.getElementById("code"), {
  lineNumbers: true,
  matchBrackets: true,
  tabSize: 2,
  theme: "seti",
  mode: "abap"
});

editor.setOption("extraKeys", {
  Tab: function(cm) {
    var spaces = Array(cm.getOption("indentUnit") + 1).join(" ");
    cm.replaceSelection(spaces);
  }
});

function rebuildMenu() {
  var left = document.getElementsByClassName("floatleft")[0];
  left.innerHTML =
    "<ol class=\"list-top\">" +
    "  <li class=\"list-item expanded\">" +
    "    <div class=\"list-content directory\">$TMP</div>" +
    "    <ol class=\"list-sub\">" +
    "      <li class=\"list-item collapsed\">" +
    "        <div class=\"list-content directory\">Programs</div>" +
    "      </li>" +
    "      <li class=\"list-item collapsed\">" +
    "        <div class=\"list-content directory\">Data Elements</div>" +
    "      </li>" +
    "      <li class=\"list-item collapsed\">" +
    "        <div class=\"list-content directory\">Domains</div>" +
    "      </li>" +
    "    </ol>" +
    "  </li>" +
    "</ol>";
}

function collapseMenu(target) {
  target.innerHTML = "\n" + target.children[0].outerHTML;
  target.classList.remove("expanded");
  target.classList.add("collapsed");
}

function expandMenu(target) {
  target.innerHTML = target.innerHTML +
    "<ol class=\"list-sub\">" +
    "  <li class=\"list-item empty\">" +
    "    <div class=\"list-content file\">ZFOOBAR</div>" +
    "  </li>" +
    "</ol>";
  target.classList.remove("collapsed");
  target.classList.add("expanded");
}

document.onclick = function(e) {
  if(e.target.className === "list-item expanded") {
    collapseMenu(e.target);
  } else if(e.target.className === "list-item collapsed") {
    expandMenu(e.target);
  } else if(e.target.className === "list-content directory") {
    alert("todo, click directory");
  } else if(e.target.className === "list-content file") {
    alert("todo, click file");
  } else if(e.target.className === "menu-item") {
    switch(e.target.innerText) {
      case "Rebuild menu":
        rebuildMenu();
        break;
      default:
        alert("todo, click menu item");
    }
  }
};