CLASS zcl_wabap_pretty_printer DEFINITION
  PUBLIC
  FINAL
  CREATE PUBLIC.

  PUBLIC SECTION.

    INTERFACES zif_swag_handler.

    CLASS-METHODS run
      IMPORTING
        !iv_code       TYPE string
      RETURNING
        VALUE(rv_code) TYPE string.
  PROTECTED SECTION.
  PRIVATE SECTION.
ENDCLASS.



CLASS ZCL_WABAP_PRETTY_PRINTER IMPLEMENTATION.


  METHOD run.

    DATA: lt_input  TYPE TABLE OF string.


    SPLIT iv_code AT cl_abap_char_utilities=>newline
      INTO TABLE lt_input.

    CALL FUNCTION 'PRETTY_PRINTER'
      EXPORTING
        inctoo             = abap_false
      TABLES
        ntext              = lt_input
        otext              = lt_input
      EXCEPTIONS
        enqueue_table_full = 1
        include_enqueued   = 2
        include_readerror  = 3
        include_writeerror = 4
        OTHERS             = 5.
    ASSERT sy-subrc = 0.

    CONCATENATE LINES OF lt_input
      INTO rv_code
      SEPARATED BY cl_abap_char_utilities=>newline.

  ENDMETHOD.


  METHOD zif_swag_handler~meta.

    FIELD-SYMBOLS: <ls_meta> LIKE LINE OF rt_meta.

    APPEND INITIAL LINE TO rt_meta ASSIGNING <ls_meta>.
    <ls_meta>-summary   = 'Pretty printer'(001).
    <ls_meta>-url-regex = '/pretty_printer$'.
    <ls_meta>-method    = zcl_swag=>c_method-post.
    <ls_meta>-handler   = 'RUN'.

  ENDMETHOD.
ENDCLASS.
