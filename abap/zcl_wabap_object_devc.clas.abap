CLASS zcl_wabap_object_devc DEFINITION
  PUBLIC
  FINAL
  CREATE PUBLIC .

  PUBLIC SECTION.

    TYPES:
      BEGIN OF ty_tadir,
        object   TYPE tadir-object,
        obj_name TYPE tadir-obj_name,
      END OF ty_tadir.

    TYPES: BEGIN OF ty_devc,
             contents TYPE STANDARD TABLE OF ty_tadir WITH DEFAULT KEY,
             tdevc    TYPE tdevc,
             tdevct   TYPE STANDARD TABLE OF tdevct WITH DEFAULT KEY,
             sub      TYPE STANDARD TABLE OF devclass WITH DEFAULT KEY,
           END OF ty_devc.

    METHODS read
      RETURNING
        VALUE(rs_data) TYPE ty_devc.
    METHODS constructor
      IMPORTING
        !iv_name TYPE tadir-obj_name .
  PROTECTED SECTION.
  PRIVATE SECTION.

    DATA mv_name TYPE devclass .
ENDCLASS.



CLASS ZCL_WABAP_OBJECT_DEVC IMPLEMENTATION.


  METHOD constructor.

    mv_name = iv_name.

  ENDMETHOD.


  METHOD read.

    SELECT SINGLE * FROM tdevc
      INTO rs_data-tdevc
      WHERE devclass = mv_name.

    SELECT * FROM tdevct
      INTO TABLE rs_data-tdevct
      WHERE devclass = mv_name
      ORDER BY PRIMARY KEY.

    SELECT * FROM tadir
      INTO CORRESPONDING FIELDS OF TABLE rs_data-contents
      WHERE devclass = mv_name
      AND author <> 'SAP'
      AND author <> 'DDIC'
      ORDER BY PRIMARY KEY.                             "#EC CI_GENBUFF

    SELECT devclass FROM tdevc INTO
      TABLE rs_data-sub
      WHERE parentcl = mv_name
      ORDER BY PRIMARY KEY.

  ENDMETHOD.
ENDCLASS.