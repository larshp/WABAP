CLASS zcl_wabap_object_devc DEFINITION
  PUBLIC
  FINAL
  CREATE PUBLIC.

  PUBLIC SECTION.

    INTERFACES zif_swag_handler.

    TYPES:
      BEGIN OF ty_tadir,
        object   TYPE tadir-object,
        obj_name TYPE tadir-obj_name,
      END OF ty_tadir.
    TYPES:
      BEGIN OF ty_devc,
        contents TYPE STANDARD TABLE OF ty_tadir WITH DEFAULT KEY,
        tdevc    TYPE tdevc,
        tdevct   TYPE STANDARD TABLE OF tdevct WITH DEFAULT KEY,
        sub      TYPE STANDARD TABLE OF devclass WITH DEFAULT KEY,
      END OF ty_devc.

    METHODS read
      IMPORTING
        !iv_name       TYPE devclass
      RETURNING
        VALUE(rs_data) TYPE ty_devc.
  PROTECTED SECTION.
  PRIVATE SECTION.
ENDCLASS.



CLASS ZCL_WABAP_OBJECT_DEVC IMPLEMENTATION.


  METHOD read.

    SELECT SINGLE * FROM tdevc
      INTO rs_data-tdevc
      WHERE devclass = iv_name.

    SELECT * FROM tdevct
      INTO TABLE rs_data-tdevct
      WHERE devclass = iv_name
      ORDER BY PRIMARY KEY.                             "#EC CI_GENBUFF

    SELECT * FROM tadir
      INTO CORRESPONDING FIELDS OF TABLE rs_data-contents
      WHERE devclass = iv_name
      AND author <> 'SAP'
      AND author <> 'DDIC'
      ORDER BY PRIMARY KEY.                             "#EC CI_GENBUFF

    SELECT devclass FROM tdevc INTO
      TABLE rs_data-sub
      WHERE parentcl = iv_name
      ORDER BY PRIMARY KEY.                             "#EC CI_GENBUFF

* todo, raise exception when not found

  ENDMETHOD.


  METHOD zif_swag_handler~meta.

    FIELD-SYMBOLS: <ls_meta> LIKE LINE OF rt_meta.


    APPEND INITIAL LINE TO rt_meta ASSIGNING <ls_meta>.
    <ls_meta>-summary   = 'Read DEVC'.
    <ls_meta>-url-regex = '/objects/DEVC/(.?\w*)/$'.
    APPEND 'IV_NAME' TO <ls_meta>-url-group_names.
    <ls_meta>-method    = zcl_swag=>c_method-get.
    <ls_meta>-handler   = 'READ'.

  ENDMETHOD.
ENDCLASS.