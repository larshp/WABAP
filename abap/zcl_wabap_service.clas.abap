CLASS zcl_wabap_service DEFINITION
  PUBLIC
  CREATE PUBLIC.

  PUBLIC SECTION.

    INTERFACES if_http_extension.

    CONSTANTS c_url TYPE string VALUE '/SAP/zwabap' ##NO_TEXT.
  PROTECTED SECTION.
  PRIVATE SECTION.
ENDCLASS.



CLASS ZCL_WABAP_SERVICE IMPLEMENTATION.


  METHOD if_http_extension~handle_request.

    DATA: li_http TYPE REF TO if_http_extension,
          lv_path TYPE string.


    lv_path = server->request->get_header_field( '~path_info' ).

    IF lv_path CP '/rest/*'.
      CREATE OBJECT li_http TYPE zcl_wabap_service_rest.
    ELSE.
      CREATE OBJECT li_http TYPE zcl_wabap_service_static.
    ENDIF.

    li_http->handle_request( server ).

  ENDMETHOD.
ENDCLASS.