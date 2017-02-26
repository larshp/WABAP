CLASS zcl_wabap_service_static DEFINITION
  PUBLIC
  CREATE PUBLIC.

  PUBLIC SECTION.

    INTERFACES if_http_extension.
  PROTECTED SECTION.
  PRIVATE SECTION.

    DATA mi_server TYPE REF TO if_http_server.

    METHODS read_mime
      IMPORTING
        !iv_file TYPE string.
ENDCLASS.



CLASS ZCL_WABAP_SERVICE_STATIC IMPLEMENTATION.


  METHOD if_http_extension~handle_request.

    DATA: lv_full TYPE string,
          lv_path TYPE string.


    mi_server = server.

    lv_full = mi_server->request->get_header_field( '~path' ).
    lv_path = mi_server->request->get_header_field( '~path_info' ).

    IF lv_full = '/sap/zwabap'.
      mi_server->response->set_header_field(
        name  = 'Location'
        value = lv_full && '/' ) ##NO_TEXT.
      mi_server->response->set_status(
        code   = 301
        reason = '301 redirect' ) ##NO_TEXT.
    ELSEIF lv_path = ''.
      read_mime( '/index.html' ).
    ELSE.
      read_mime( lv_path ).
    ENDIF.

  ENDMETHOD.


  METHOD read_mime.

    DATA: li_api       TYPE REF TO if_mr_api,
          lv_data      TYPE xstring,
          lv_mime      TYPE string,
          lv_changed   TYPE smimphio-chng_time,
          lv_timestamp TYPE char14,
          lv_modified  TYPE string,
          lv_folder    TYPE abap_bool,
          lv_url       TYPE string.


    lv_url = zcl_wabap_service=>c_url && iv_file.

    li_api = cl_mime_repository_api=>if_mr_api~get_api( ).

    li_api->get(
      EXPORTING
        i_url                  = lv_url
      IMPORTING
        e_content              = lv_data
        e_mime_type            = lv_mime
        e_content_last_changed = lv_changed
        e_is_folder            = lv_folder
      EXCEPTIONS
        not_found              = 1 ).
    IF sy-subrc = 1 OR lv_folder = abap_true.
      mi_server->response->set_cdata( '404' ).
      mi_server->response->set_status( code = 404 reason = '404' && iv_file ).
      RETURN.
    ENDIF.

    lv_timestamp = lv_changed.
    lv_modified = cl_bsp_utility=>date_to_string_http( lv_timestamp ).
    DATA(lv_value) = mi_server->request->get_header_field(
      name  = 'If-Modified-Since' ) ##NO_TEXT.
    IF lv_modified = lv_value.
      mi_server->response->set_status( code = 304 reason = '' ).
      RETURN.
    ENDIF.

    mi_server->response->set_header_field(
      name  = 'Cache-Control'
      value = 'max-age=86400' ) ##NO_TEXT.

    mi_server->response->set_header_field(
      name  = 'Last-Modified'
      value = lv_modified ) ##NO_TEXT.

    mi_server->response->set_compression( ).
    mi_server->response->set_content_type( lv_mime ).
    mi_server->response->set_data( lv_data ).

  ENDMETHOD.
ENDCLASS.
