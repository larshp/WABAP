CLASS zcl_wabap_service DEFINITION
  PUBLIC
  CREATE PUBLIC.

  PUBLIC SECTION.

    INTERFACES if_http_extension.

    CONSTANTS c_url TYPE string VALUE '/SAP/zwabap' ##NO_TEXT.
  PROTECTED SECTION.

    METHODS to_json
      IMPORTING
        !ig_data       TYPE any
      RETURNING
        VALUE(rv_json) TYPE xstring.
    METHODS read_mime
      IMPORTING
        !iv_file TYPE string.

  PRIVATE SECTION.

    DATA mi_server TYPE REF TO if_http_server.
ENDCLASS.



CLASS ZCL_WABAP_SERVICE IMPLEMENTATION.


  METHOD if_http_extension~handle_request.

* see https://github.com/larshp/WABAP/wiki/REST

    DATA: lv_reason TYPE string,
          lv_path   TYPE string,
          lv_name   TYPE tadir-obj_name,
          lv_full   TYPE string,
          lt_path   TYPE TABLE OF string.


    mi_server = server.

    lv_full = server->request->get_header_field( '~path' ).
    lv_path = server->request->get_header_field( '~path_info' ).

    DATA(lv_method) = server->request->get_method( ).

    SPLIT lv_path AT '/' INTO TABLE lt_path.
    READ TABLE lt_path INDEX 5 INTO lv_name.              "#EC CI_SUBRC
    TRANSLATE lv_name TO UPPER CASE.

* todo, refactor
    IF lv_path CP '/rest/objects/DEVC/*'.
      DATA(lo_devc) = NEW zcl_wabap_object_devc( lv_name ).
      server->response->set_data( to_json( lo_devc->read( ) ) ).

    ELSEIF lv_path CP '/rest/objects/PROG/*/abap'.
      DATA(lo_prog) = NEW zcl_wabap_object_prog( lv_name ).
      server->response->set_header_field(
        name  = 'Content-Type'
        value = 'text/plain' ) ##NO_TEXT.
      server->response->set_cdata( lo_prog->abap( ) ).
    ELSEIF lv_path CP '/rest/objects/PROG/*'.
      lo_prog = NEW zcl_wabap_object_prog( lv_name ).
      server->response->set_data( to_json( lo_prog->read( ) ) ).

    ELSEIF lv_path CP '/rest/objects/CLAS/*/abap'.
      DATA(lo_clas) = NEW zcl_wabap_object_clas( lv_name ).
      server->response->set_header_field(
        name  = 'Content-Type'
        value = 'text/plain' ) ##NO_TEXT.
      server->response->set_cdata( lo_clas->abap( ) ).
    ELSEIF lv_path CP '/rest/objects/CLAS/*'.
      lo_clas = NEW zcl_wabap_object_clas( lv_name ).
      server->response->set_data( to_json( lo_clas->read( ) ) ).

    ELSEIF lv_path CP '/rest/objects/SMIM/*/content'.
      DATA(lo_smim) = NEW zcl_wabap_object_smim( lv_name ).
      IF lv_method = 'POST'.
        lo_smim->save_content( server->request->get_data( ) ).
      ELSE.
        server->response->set_data( lo_smim->read_content( ) ).
      ENDIF.
    ELSEIF lv_path CP '/rest/objects/SMIM/*'.
      lo_smim = NEW zcl_wabap_object_smim( lv_name ).
      server->response->set_data( to_json( lo_smim->read( ) ) ).

    ELSEIF lv_path CP '/rest/pretty_printer'.
      server->response->set_cdata(
        zcl_wabap_pretty_printer=>run(
        server->request->get_cdata( ) ) ).

    ELSEIF lv_full = '/sap/zwabap'.
      server->response->set_header_field(
        name  = 'Location'
        value = lv_full && '/' ).
      server->response->set_status( code = 301 reason = '301 redirect' ).
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


    lv_url = c_url && iv_file.

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


  METHOD to_json.

    DATA: lo_writer TYPE REF TO cl_sxml_string_writer.


    lo_writer = cl_sxml_string_writer=>create( if_sxml=>co_xt_json ).
    CALL TRANSFORMATION id
      SOURCE data = ig_data
      RESULT XML lo_writer.
    rv_json = lo_writer->get_output( ).

  ENDMETHOD.
ENDCLASS.