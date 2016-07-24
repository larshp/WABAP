CLASS zcl_wabap_object_prog DEFINITION
  PUBLIC
  FINAL
  CREATE PUBLIC.

  PUBLIC SECTION.

    INTERFACES zif_swag_handler.

    TYPES:
      BEGIN OF ty_prog,
        progdir TYPE progdir,
      END OF ty_prog.

    METHODS read
      IMPORTING
        !iv_name       TYPE progname
      RETURNING
        VALUE(rs_data) TYPE ty_prog.
    METHODS abap
      IMPORTING
        !iv_name       TYPE progname
      RETURNING
        VALUE(rv_abap) TYPE string.
  PROTECTED SECTION.
  PRIVATE SECTION.
ENDCLASS.



CLASS ZCL_WABAP_OBJECT_PROG IMPLEMENTATION.


  METHOD abap.

    DATA: lt_source TYPE STANDARD TABLE OF abaptxt255.

    CALL FUNCTION 'RPY_PROGRAM_READ'
      EXPORTING
        program_name     = iv_name
        with_lowercase   = abap_true
      TABLES
        source_extended  = lt_source
      EXCEPTIONS
        cancelled        = 1
        not_found        = 2
        permission_error = 3
        OTHERS           = 4.
    ASSERT sy-subrc = 0. " todo, error handling

    CONCATENATE LINES OF lt_source
      INTO rv_abap
      SEPARATED BY cl_abap_char_utilities=>newline.

  ENDMETHOD.


  METHOD read.

    CALL FUNCTION 'READ_PROGDIR'
      EXPORTING
        i_progname = iv_name
        i_state    = 'A'   " todo, possibility to handle inactive state
      IMPORTING
        e_progdir  = rs_data-progdir.

  ENDMETHOD.


  METHOD zif_swag_handler~meta.

    FIELD-SYMBOLS: <ls_meta> LIKE LINE OF rt_meta.


    APPEND INITIAL LINE TO rt_meta ASSIGNING <ls_meta>.
    <ls_meta>-summary   = 'Read PROG'.
    <ls_meta>-url-regex = '/objects/PROG/(\w*)/$'.
    APPEND 'IV_NAME' TO <ls_meta>-url-group_names.
    <ls_meta>-method    = zcl_swag=>c_method-get.
    <ls_meta>-handler   = 'READ'.

    APPEND INITIAL LINE TO rt_meta ASSIGNING <ls_meta>.
    <ls_meta>-summary   = 'Read PROG ABAP'.
    <ls_meta>-url-regex = '/objects/PROG/(\w*)/abap/$'.
    APPEND 'IV_NAME' TO <ls_meta>-url-group_names.
    <ls_meta>-method    = zcl_swag=>c_method-get.
    <ls_meta>-handler   = 'ABAP'.

  ENDMETHOD.
ENDCLASS.