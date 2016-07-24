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
          lv_path     TYPE string,
          lv_json_url TYPE string,
          li_handler  TYPE REF TO zif_swag_handler.


    CREATE OBJECT lo_swag
      EXPORTING
        ii_server = server
        iv_base   = c_base.

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

    lv_json_url = c_base && '/swagger.json'.

    lv_path = server->request->get_header_field( '~path' ).
* todo, move this part into ZCL_SWAG?
    IF lv_path = c_base && '/swagger.html'.
      lo_swag->generate_ui(
        iv_json_url = lv_json_url
        iv_title    = 'WABAP - Swagger' ).
    ELSEIF lv_path = lv_json_url.
      lo_swag->generate_spec(
        iv_title       = 'WABAP'
        iv_description = 'WABAP REST functions' ).
    ELSE.
      lo_swag->run( ).
    ENDIF.

  ENDMETHOD.
ENDCLASS.