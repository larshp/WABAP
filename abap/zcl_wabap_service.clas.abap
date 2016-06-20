CLASS zcl_wabap_service DEFINITION
  PUBLIC
  CREATE PUBLIC.

  PUBLIC SECTION.

    INTERFACES if_http_extension.

    CONSTANTS cv_url TYPE string VALUE '/SAP/zwabap' ##NO_TEXT.

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
    DATA mv_server TYPE REF TO if_http_server.

ENDCLASS.



CLASS ZCL_WABAP_SERVICE IMPLEMENTATION.


  METHOD if_http_extension~handle_request.

* see https://github.com/larshp/WABAP/wiki/REST

    DATA: lv_reason TYPE string,
          lv_path   TYPE string,
          lv_name   TYPE tadir-obj_name,
          lt_path   TYPE TABLE OF string.

    mv_server = server.

    lv_path = server->request->get_header_field( '~path_info' ).

    DATA(lv_method) = server->request->get_method( ).

    SPLIT lv_path AT '/' INTO TABLE lt_path.
    READ TABLE lt_path INDEX 5 INTO lv_name.
    TRANSLATE lv_name TO UPPER CASE.

* todo, refactor
    IF lv_path CP '/rest/objects/DEVC/*'.
      DATA(lo_devc) = NEW zcl_wabap_object_devc( lv_name ).
      server->response->set_data( to_json( lo_devc->read( ) ) ).

    ELSEIF lv_path CP '/rest/objects/PROG/*/abap'.
      DATA(lo_prog) = NEW zcl_wabap_object_prog( lv_name ).
      server->response->set_header_field(
        name  = 'Content-Type'
        value = 'text/plain' ).
      server->response->set_cdata( lo_prog->abap( ) ).
    ELSEIF lv_path CP '/rest/objects/PROG/*'.
      lo_prog = NEW zcl_wabap_object_prog( lv_name ).
      server->response->set_data( to_json( lo_prog->read( ) ) ).

    ELSEIF lv_path CP '/rest/objects/CLAS/*/abap'.
      DATA(lo_clas) = NEW zcl_wabap_object_clas( lv_name ).
      server->response->set_header_field(
        name  = 'Content-Type'
        value = 'text/plain' ).
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

    ELSEIF lv_path = '' OR lv_path = '/'.
* todo, redirect "/wabap" to "/wabap/" ?
      read_mime( '/index.html' ).
    ELSE.
      read_mime( lv_path ).
    ENDIF.

    server->response->set_status( code = 200
                                  reason = lv_reason ).

  ENDMETHOD.


  METHOD read_mime.

* todo, does this work with browser caching?
* or use something more standard instead?

    DATA: li_api  TYPE REF TO if_mr_api,
          lv_data TYPE xstring,
          lv_mime TYPE string,
          lv_url  TYPE string.


    lv_url = cv_url && iv_file.

    li_api = cl_mime_repository_api=>if_mr_api~get_api( ).

    li_api->get(
      EXPORTING
        i_url       = lv_url
      IMPORTING
        e_content   = lv_data
        e_mime_type = lv_mime ).

    mv_server->response->set_content_type( lv_mime ).
    mv_server->response->set_data( lv_data ).

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