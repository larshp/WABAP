CLASS zcl_wabap_service DEFINITION
  PUBLIC
  CREATE PUBLIC.

  PUBLIC SECTION.

    INTERFACES if_http_extension.

    CONSTANTS cv_url TYPE string VALUE '/SAP/zwabap' ##NO_TEXT.

protected section.

  methods TO_JSON
    importing
      !IG_DATA type ANY
    returning
      value(RV_JSON) type XSTRING .
  methods READ_MIME
    importing
      !IV_FILE type STRING
    returning
      value(RV_DATA) type XSTRING .
ENDCLASS.



CLASS ZCL_WABAP_SERVICE IMPLEMENTATION.


  METHOD if_http_extension~handle_request.

* root = main entry, serve bundle.js and index.html
*        also see comment in method READ_MIME

* /rest/ = rest services

*    DATA: lt_fields TYPE tihttpnvp,
*          lv_html   TYPE string.
*    FIELD-SYMBOLS: <ls_fields> LIKE LINE OF lt_fields.
*    server->request->get_header_fields( CHANGING fields = lt_fields ).
*    LOOP AT lt_fields ASSIGNING <ls_fields>.
*      lv_html = lv_html && <ls_fields>-name && '=' && <ls_fields>-value && '<br>'.
*    ENDLOOP.
*    server->response->set_cdata( lv_html ).

    DATA: lv_reason TYPE string,
          lv_path   TYPE string,
          lv_name   TYPE tadir-obj_name,
          lt_path   TYPE TABLE OF string.

    lv_path = server->request->get_header_field( '~path_info' ).

    SPLIT lv_path AT '/' INTO TABLE lt_path.
    READ TABLE lt_path INDEX 5 INTO lv_name.
    TRANSLATE lv_name TO UPPER CASE.

    IF lv_path CP '/rest/objects/DEVC/*'.
      DATA(lo_devc) = NEW zcl_wabap_object_devc( lv_name ).
      DATA(ls_devc) = lo_devc->read( ).
      server->response->set_data( to_json( ls_devc ) ).
    ELSEIF lv_path CP '/rest/objects/PROG/*/abap'.
      DATA(lo_prog) = NEW zcl_wabap_object_prog( lv_name ).
      DATA(lv_abap) = lo_prog->abap( ).
      server->response->set_header_field(
        name  = 'Content-Type'
        value = 'text/plain' ).
      server->response->set_cdata( lv_abap ).
    ELSEIF lv_path CP '/rest/objects/PROG/*'.
      lo_prog = NEW zcl_wabap_object_prog( lv_name ).
      DATA(ls_prog) = lo_prog->read( ).
      server->response->set_data( to_json( ls_prog ) ).
    ELSEIF lv_path = '' OR lv_path = '/'.
* todo, redirect "/wabap" to "/wabap/" ?
      server->response->set_data( read_mime( '/index.html' ) ).
    ELSE.
      server->response->set_data( read_mime( lv_path ) ).
    ENDIF.

    server->response->set_status( code = 200
                                  reason = lv_reason ).

  ENDMETHOD.


  METHOD read_mime.

* todo, does this work with browser caching?
* or use something more standard instead?

    DATA: li_api TYPE REF TO if_mr_api,
          lv_url TYPE string.


    lv_url = cv_url && iv_file.

    li_api = cl_mime_repository_api=>if_mr_api~get_api( ).

    li_api->get(
      EXPORTING
        i_url = lv_url
      IMPORTING
        e_content = rv_data ).

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