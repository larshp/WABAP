CLASS zcl_wabap_service_rest DEFINITION
  PUBLIC
  CREATE PUBLIC.

  PUBLIC SECTION.

    INTERFACES if_http_extension.
  PROTECTED SECTION.
  PRIVATE SECTION.
ENDCLASS.



CLASS ZCL_WABAP_SERVICE_REST IMPLEMENTATION.


  METHOD if_http_extension~handle_request.

    CONSTANTS: c_base TYPE string VALUE '/sap/zwabap/rest' ##NO_TEXT.

    DATA: lo_swag     TYPE REF TO zcl_swag,
          li_handler  TYPE REF TO zif_swag_handler.


    CREATE OBJECT lo_swag
      EXPORTING
        ii_server = server
        iv_base   = c_base
        iv_title  = 'WABAP'.

    CREATE OBJECT li_handler TYPE zcl_wabap_pretty_printer.
    lo_swag->register( li_handler ).
    CREATE OBJECT li_handler TYPE zcl_wabap_object_devc.
    lo_swag->register( li_handler ).
    CREATE OBJECT li_handler TYPE zcl_wabap_object_smim.
    lo_swag->register( li_handler ).
    CREATE OBJECT li_handler TYPE zcl_wabap_object_prog.
    lo_swag->register( li_handler ).
    CREATE OBJECT li_handler TYPE zcl_wabap_object_clas.
    lo_swag->register( li_handler ).

    lo_swag->run( ).

  ENDMETHOD.
ENDCLASS.