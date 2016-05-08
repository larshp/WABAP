import {observable} from "mobx";

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

  public open(s: string) {
    this.unHide();
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
        mode: "abap",
        theme: "seti",
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
      },
    });
  }
}