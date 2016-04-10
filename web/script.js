/*
var editor = null;

function toggleMode(cm) {
  if(cm.getOption("readOnly") === true) {
    cm.setOption("readOnly", false);
    cm.setOption("theme", "seti");
  } else {
    cm.setOption("readOnly", true);
    cm.setOption("theme", "bespin");
  }
}

function initCodeMirror() {
  var right = document.getElementsByClassName("floatright")[0];
  right.innerHTML =
    "<form>" +
    "<textarea id=\"code\" name=\"code\"></textarea>" +
    "</form>";

   global CodeMirror
  editor = CodeMirror.fromTextArea(document.getElementById("code"), {
    lineNumbers: true,
    matchBrackets: true,
    tabSize: 2,
    theme: "seti",
    mode: "abap"
  });

// todo, keys for commenting
  editor.setOption("extraKeys", {
    Tab: function(cm) {
      var spaces = Array(cm.getOption("indentUnit") + 1).join(" ");
      cm.replaceSelection(spaces);
    },
    "Ctrl-F1": function(cm) {
      toggleMode(cm);
    },
    "Ctrl-F2": function(cm) {
      alert("todo, check!");
    },
    "Ctrl-F3": function(cm) {
      alert("todo, activate!");
    },
    "Shift-F1": function(cm) {
      alert("todo, pretty print");
    },
    "F11": function(cm) {
      alert("todo, save");
    },
    "Ctrl-S": function(cm) {
      alert("todo, save");
    }
  });
}

function openEditor() {
  if(editor === null) {
    initCodeMirror();
  }

  editor.focus();
  editor.setValue( "* ABAP mode testing\nWRITE 'Hello world'.");
}
*/