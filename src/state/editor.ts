import {observable} from "mobx";
import * as CodeMirror from "codemirror";

const COMMENT  = "comment";
const STRING   = "string";
const NUMBER   = "number";
const KEYWORD  = "keyword";
const OPERATOR = "operator";
const ERROR    = "error";

// todo, this is a workaround, it should use package codemirror-abap instead
// however it seems difficult due to the browserify setup
class AbapMode implements CodeMirror.Mode<any> {

    public token(stream: CodeMirror.StringStream, state: any) {

        if (stream.eatSpace()) { return undefined; };

        if (this.isKeyword(stream)) {
            return KEYWORD;
        } else if (stream.match(/^\d+( |\.|$)/, false) !== null) {
            stream.match(/^\d+/);
            return NUMBER;
        } else if (stream.match(/^##\w+/) !== null) {
// pragmas
            return COMMENT;
        }

        let ch = stream.next();
        let peek = stream.peek();
        if (peek === undefined) {
            peek = "";
        }
        let col = stream.column();

        if ((ch === "*" && col === 0) || ch === "\"") {
            stream.skipToEnd();
            return COMMENT;
        } else if (this.isOperator(ch + peek)) {
            if (peek !== " ") {
                stream.next();
            }
            return OPERATOR;
        } else if (ch === "\'") {
            let next = "";
            while (next !== undefined) {
                if (next === "\'") {
                    state = false; // her
                    break;
                }
                next = stream.next();
            }
            return STRING;
        } else if (ch === "|") {
            let next = "";
            while (next !== undefined) {
                if (next === "|") {
                    state = false; // her
                    break;
                }
                next = stream.next();
            }
            return STRING;
        } else {
            stream.eatWhile(/(\w|<|>)/);
            return ERROR;
        }
    };

    private isOperator(str: string): boolean {
        const OPERATORS = "?= = > <> < + - * / &&";

        str = str.trim();

        let list = OPERATORS.split(" ");

        for (let i = 0; i < list.length; i++) {
            if (str === list[i]) {
                return true;
            }
        }
        return false;
    }

    private isKeyword(stream: CodeMirror.StringStream): boolean {

        const KEYWORDS =
            "IS NOT EQ GE GT REF " +
            "AND ALIAS ALIASES APPEND ASCENDING ASSERT ASSIGN ASSIGNING " +
            "BACK BEGIN BINARY BLOCK BOUND BY BYTE " +
            "CALL CHANGING CHECK CLEAR CLOSE CNT COLLECT COMMIT CHARACTER " +
            "CORRESPONDING COMMUNICATION COMPONENT COMPUTE CONCATENATE CONDENSE CONSTANTS " +
            "CONTROLS CONVERT CREATE CURRENCY " +
            "DATA DESCENDING DEFAULT DEFINE DEFINITION DEFERRED DELETE DESCRIBE DETAIL DIVIDE DURATION " +
            "DELETING " +
            "END ENDEXEC ENDFUNCTION " +
            "ENDCLASS ENDMETHOD ENDFORM " +
            "CLASS METHOD FORM " +
            "ENDINTERFACE ENDMODULE " +
            "ENDPROVIDE ENDSELECT ENDTRY ENDWHILE EVENT EVENTS EXEC EXIT EXPORT " +
            "EXPORTING EXTRACT EXCEPTION EXCEPTIONS " +
            "FRAME FETCH FIELDS FINAL FORMAT FREE FROM FUNCTION FIND FOR " +
            "GENERATE " +
            "HARMLESS HIDE " +
            "IMPORT IMPORTING INDEX INFOTYPES INITIAL INITIALIZATION " +
            "INTERFACE INTERFACES INPUT INSERT IMPLEMENTATION INTO " +
            "LEAVE LEVEL LIKE LINE LOAD LOCAL LENGTH LEFT LEADING " +
            "METHOD MESSAGE METHODS MODIFY MODULE MOVE MULTIPLY MATCH " +
            "NEW " +
            "OBJECT OBLIGATORY OVERLAY OPTIONAL OTHERS OCCURRENCES OCCURS OFFSET " +
            "PACK PARAMETERS PERFORM POSITION PRIVATE PROGRAM PROTECTED PROVIDE PUBLIC " +
            "RADIOBUTTON RAISING RANGES RECEIVE RECEIVING REDEFINITION REF " +
            "REFERENCE REFRESH REGEX REJECT RESULTS " +
            "REPLACE REPORT RESERVE RESTORE RETURN RETURNING RISK ROLLBACK READ " +
            "SCAN SCROLL SEARCH SELECT SEPARATED SHIFT SHORT SINGLE SKIP SORT SORTED SPLIT STANDARD " +
            "STATICS STEP STOP STRUCTURE SUBMATCHES SUBMIT SUBTRACT SUMMARY SUPPRESS SECTION " +
            "TABLES TABLE TESTING TIMES TITLE TITLEBAR TO TRANSFER TRANSFORMATION TRANSLATE TYPES TYPE " +
            "UNASSIGN ULINE UNPACK UPDATE USING " +
            "VALUE " +
            "WHEN WHILE WINDOW WRITE WHERE WITH " +
            "ADD-CORRESPONDING AUTHORITY-CHECK " +
            "BREAK-POINT CLASS-DATA " +
            "CLASS-METHOD CLASS-METHODS " +
            "DIVIDE-CORRESPONDING DISPLAY DISPLAY-MODE " +
            "EDITOR-CALL END-OF-DEFINITION END-OF-PAGE END-OF-SELECTION " +
            "FIELD-GROUPS FIELD-SYMBOLS " +
            "FUNCTION-POOL LEFT-JUSTIFIED LINE-COUNT LINE-SIZE " +
            "MESSAGE-ID MOVE-CORRESPONDING MULTIPLY-CORRESPONDING " +
            "NEW-LINE NEW-PAGE NEW-SECTION " +
            "NO-GAP NO-SIGN " +
            "NO-ZERO PRINT-CONTROL " +
            "READ-ONLY RIGHT-JUSTIFIED " +
            "SELECT-OPTIONS SELECTION-SCREEN START-OF-SELECTION " +
            "SUBTRACT-CORRESPONDING SYNTAX-CHECK " +
            "SYNTAX-TRACE SYSTEM-CALL TOP-OF-PAGE TYPE-POOL TYPE-POOLS " +
            "AT CASE CATCH CONTINUE DO ELSEIF ELSE ENDAT ENDCASE ENDDO ENDIF " +
            "ENDLOOP ENDON IF LOOP ON RAISE TRY";

        let list = KEYWORDS.split(" ");

        let match = false;
        for (let i = 0; i < list.length; i++) {
            let reg = new RegExp("^" + list[i] + "( |\\\.|,|:|$)", "i");
            if (stream.match(reg, false) !== null) {
                let reg = new RegExp("^" + list[i], "i");
                stream.match(reg);
                match = true;
                break;
            }
        }
        return match;
    }
}

CodeMirror.defineMode("abap", (options: CodeMirror.EditorConfiguration, spec: any) => { return new AbapMode(); });


function setReadOnly(cm, b: boolean) {
  cm.setOption("readOnly", b);
  if (b === true) {
    cm.setOption("theme", "bespin");
  } else {
    cm.setOption("theme", "seti");
  }
}

function toggleReadOnly(cm) {
  if(cm.getOption("readOnly") === true) {
    setReadOnly(cm, false);
  } else {
    setReadOnly(cm, true);
  }
}

export class Editor {
  @observable public visible = false;

  public editor = undefined;

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
        var spaces = Array(cm.getOption("indentUnit") + 1).join(" ");
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
      }
    });
  }

  public hide() {
    this.editor.getWrapperElement().style.visibility = "hidden";
  }

  public unHide() {
    this.editor.getWrapperElement().style.visibility = "";
  }

  public initEditor() {
    if(this.editor === undefined) {
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
}