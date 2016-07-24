CLASS zcl_wabap_object_clas DEFINITION
  PUBLIC
  FINAL
  CREATE PUBLIC.

  PUBLIC SECTION.

    INTERFACES zif_swag_handler.

    TYPES:
      BEGIN OF ty_clas,
        vseoclass TYPE vseoclass,
      END OF ty_clas.

    METHODS read
      IMPORTING
        !iv_name       TYPE seoclsname
      RETURNING
        VALUE(rs_data) TYPE ty_clas.
    METHODS abap
      IMPORTING
        !iv_name       TYPE seoclsname
      RETURNING
        VALUE(rv_abap) TYPE string.
  PROTECTED SECTION.
  PRIVATE SECTION.
ENDCLASS.



CLASS ZCL_WABAP_OBJECT_CLAS IMPLEMENTATION.


  METHOD abap.

    DATA: li_source   TYPE REF TO if_oo_clif_source,
          lo_instance TYPE REF TO cl_oo_factory.


    lo_instance = cl_oo_factory=>create_instance( ).

    li_source = lo_instance->create_clif_source(
      clif_name = iv_name
      version   = 'A' ).

    li_source->get_source(
      IMPORTING
        source = DATA(lt_source) ).

    CONCATENATE LINES OF lt_source
      INTO rv_abap
      SEPARATED BY cl_abap_char_utilities=>newline.

  ENDMETHOD.


  METHOD read.

    DATA: ls_clskey TYPE seoclskey.


    ls_clskey-clsname = iv_name.

    CALL FUNCTION 'SEO_CLIF_GET'
      EXPORTING
        cifkey  = ls_clskey
        version = seoc_version_active
      IMPORTING
        class   = rs_data-vseoclass.  " todo, active vs inactive

  ENDMETHOD.


  METHOD zif_swag_handler~meta.

    FIELD-SYMBOLS: <ls_meta> LIKE LINE OF rt_meta.


    APPEND INITIAL LINE TO rt_meta ASSIGNING <ls_meta>.
    <ls_meta>-summary   = 'Read CLAS'.
    <ls_meta>-url-regex = '/objects/CLAS/(\w*)/$'.
    APPEND 'IV_NAME' TO <ls_meta>-url-group_names.
    <ls_meta>-method    = zcl_swag=>c_method-get.
    <ls_meta>-handler   = 'READ'.

    APPEND INITIAL LINE TO rt_meta ASSIGNING <ls_meta>.
    <ls_meta>-summary   = 'Read CLAS ABAP'.
    <ls_meta>-url-regex = '/objects/CLAS/(\w*)/abap/$'.
    APPEND 'IV_NAME' TO <ls_meta>-url-group_names.
    <ls_meta>-method    = zcl_swag=>c_method-get.
    <ls_meta>-handler   = 'ABAP'.

  ENDMETHOD.
ENDCLASS.