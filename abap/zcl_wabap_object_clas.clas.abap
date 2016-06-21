CLASS zcl_wabap_object_clas DEFINITION
  PUBLIC
  FINAL
  CREATE PUBLIC.

  PUBLIC SECTION.

    TYPES:
      BEGIN OF ty_clas,
        vseoclass TYPE vseoclass,
      END OF ty_clas.

    METHODS read
      RETURNING
        VALUE(rs_data) TYPE ty_clas.
    METHODS constructor
      IMPORTING
        !iv_name TYPE tadir-obj_name.
    METHODS abap
      RETURNING
        VALUE(rv_abap) TYPE string.
  PROTECTED SECTION.
  PRIVATE SECTION.

    DATA mv_name TYPE seoclsname.
ENDCLASS.



CLASS ZCL_WABAP_OBJECT_CLAS IMPLEMENTATION.


  METHOD abap.

    DATA: li_source   TYPE REF TO if_oo_clif_source,
          lo_instance TYPE REF TO cl_oo_factory.


    lo_instance = cl_oo_factory=>create_instance( ).

    li_source = lo_instance->create_clif_source(
      clif_name = mv_name
      version   = 'A' ).

    li_source->get_source(
      IMPORTING
        source = DATA(lt_source) ).

    CONCATENATE LINES OF lt_source
      INTO rv_abap
      SEPARATED BY cl_abap_char_utilities=>newline.

  ENDMETHOD.


  METHOD constructor.

    mv_name = iv_name.

  ENDMETHOD.


  METHOD read.

    DATA: ls_clskey TYPE seoclskey.


    ls_clskey-clsname = mv_name.

    CALL FUNCTION 'SEO_CLIF_GET'
      EXPORTING
        cifkey  = ls_clskey
        version = seoc_version_active
      IMPORTING
        class   = rs_data-vseoclass.  " todo, active vs inactive

  ENDMETHOD.
ENDCLASS.