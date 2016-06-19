import {observable} from "mobx";
import * as abaplint from "abaplint";
import * as Store from "./";

declare var CodeMirror: any;

function setReadOnly(cm, b: boolean) {
  cm.setOption("readOnly", b);
  if (b === true) {
    cm.setOption("theme", "bespin");
  } else {
    cm.setOption("theme", "seti");
  }
}

function toggleReadOnly(cm) {
  if (cm.getOption("readOnly") === true) {
    setReadOnly(cm, false);
  } else {
    setReadOnly(cm, true);
  }
}

function validator(text, callback, options) {
  let result = [];

  let issues = abaplint.run("foobar.abap", text);

  for (let issue of issues) {
    result.push(
      {
        message: issue.getDescription(),
        severity: "error",
        from: CodeMirror.Pos(issue.getStart().getRow() - 1, issue.getStart().getCol() - 1),
        to: CodeMirror.Pos(issue.getEnd().getRow() - 1, issue.getEnd().getCol() - 1),
      });
  }

  callback(result);
}

export class Editor {
  @observable public visible = false;

  public editor = undefined;

  public hide() {
    this.editor.getWrapperElement().style.visibility = "hidden";
  }

  public unHide() {
    this.editor.getWrapperElement().style.visibility = "";
  }

  public initEditor() {
    if (this.editor === undefined) {
      this.initCodeMirror();
    }
    this.hide();
  }

  public open(s: string, mode: string) {
    this.unHide();
    this.editor.setOption("mode", mode);
    if (mode === "abap") {
      this.editor.setOption("lint", {
          "getAnnotations": validator,
          "async" : true,
        });
    } else {
      this.editor.setOption("lint", undefined);
    }
    setReadOnly(this.editor, false);
    this.editor.focus();
    this.editor.setValue(s);
  }

  public getValue(): string {
    return this.editor.getValue();
  }

  private initCodeMirror() {

    this.editor = CodeMirror.fromTextArea(
      document.getElementById("code") as HTMLTextAreaElement,
      {
        lineNumbers: true,
        tabSize: 2,
        theme: "seti",
        gutters: ["CodeMirror-lint-markers"],
      }
    );

    // consume the full div height
    this.editor.getWrapperElement().style.height = "calc(100vh - 40px)";

    this.editor.setOption("extraKeys", {
      Tab: function(cm) {
        let spaces = Array(cm.getOption("indentUnit") + 1).join(" ");
        cm.replaceSelection(spaces);
      },
      "Ctrl-F1": function(cm) {
        toggleReadOnly(cm);
      },
      "Ctrl-F2": function(cm) {
        alert("todo, check! ctrl+f2");
      },
      "Ctrl-F3": function(cm) {
        alert("todo, activate! ctrl+f3");
      },
      "Shift-F1": function(cm) {
        alert("todo, pretty print, shift+f1");
      },
      "F11": function(cm) {
        alert("todo, save, f11");
      },
      "Ctrl-S": function(cm) {
        Store.getStore().tablist.getActive().getSave()(cm.getValue());
      },
    });
  }
}