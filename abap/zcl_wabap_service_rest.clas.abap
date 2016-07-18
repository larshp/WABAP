CLASS zcl_wabap_service_rest DEFINITION
  PUBLIC
  CREATE PUBLIC.

  PUBLIC SECTION.

    INTERFACES if_http_extension.
  PROTECTED SECTION.
  PRIVATE SECTION.

    METHODS to_json
      IMPORTING
        !ig_data       TYPE any
      RETURNING
        VALUE(rv_json) TYPE xstring.
ENDCLASS.



CLASS ZCL_WABAP_SERVICE_REST IMPLEMENTATION.


  METHOD if_http_extension~handle_request.

    DATA: lv_path   TYPE string,
          lv_name   TYPE tadir-obj_name,
          lt_path   TYPE TABLE OF string.


    lv_path = server->request->get_header_field( '~path_info' ).

    DATA(lv_method) = server->request->get_method( ).

    SPLIT lv_path AT '/' INTO TABLE lt_path.
    READ TABLE lt_path INDEX 5 INTO lv_name.              "#EC CI_SUBRC
    TRANSLATE lv_name TO UPPER CASE.

* todo, use ABAP Swagger
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
    ELSE.
      server->response->set_cdata( '404' ).
      server->response->set_status( code = 404 reason = '404' ).
    ENDIF.

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