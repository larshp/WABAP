class ZCL_WABAP_SERVICE definition
  public
  create public .

public section.

  interfaces IF_HTTP_EXTENSION .

  constants GC_URL type STRING value '/SAP/zwabap' ##NO_TEXT.
protected section.

  types:
    BEGIN OF ty_tadir,
      pgmid      TYPE tadir-pgmid,
      object     TYPE tadir-object,
      obj_name   TYPE tadir-obj_name,
      srcsystem  TYPE tadir-srcsystem,
      author     TYPE tadir-author,
      devclass   TYPE tadir-devclass,
      masterlang TYPE tadir-masterlang,
      delflag    TYPE tadir-delflag,
    END OF ty_tadir .
  types:
    ty_tadir_tt TYPE STANDARD TABLE OF ty_tadir WITH DEFAULT KEY .
  types:
    BEGIN OF ty_report,
      progdir type PROGDIR,
      source TYPE STANDARD TABLE OF abaptxt255 WITH DEFAULT KEY,
    END OF ty_report .

  methods READ_REPORT
    importing
      !IV_NAME type PROGNAME
    returning
      value(RS_REPORT) type TY_REPORT .
  methods READ_TADIR
    returning
      value(RT_DATA) type TY_TADIR_TT .
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
private section.
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
        lv_path   TYPE string.

  lv_path = server->request->get_header_field( '~path_info' ).

  IF lv_path CP '/rest/tadir*'.
    DATA(lt_tadir) = read_tadir( ).
    server->response->set_data( to_json( lt_tadir ) ).
  ELSEIF lv_path CP '/rest/reports/*'.
    DATA(ls_report) = read_report( CONV #( lv_path+14 ) ).
    server->response->set_data( to_json( ls_report ) ).
  ELSEIF lv_path = '' OR lv_path = '/'.
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


  lv_url = gc_url && iv_file.

  li_api = cl_mime_repository_api=>if_mr_api~get_api( ).

  li_api->get(
    EXPORTING
      i_url = lv_url
    IMPORTING
      e_content = rv_data ).

ENDMETHOD.


METHOD read_report.

* todo, security? escape some stuff?

  DATA(lv_program) = CONV progname( to_upper( iv_name ) ).

  CALL FUNCTION 'RPY_PROGRAM_READ'
    EXPORTING
      program_name     = lv_program
      with_lowercase   = abap_true
    TABLES
      source_extended  = rs_report-source
    EXCEPTIONS
      cancelled        = 1
      not_found        = 2
      permission_error = 3
      OTHERS           = 4.
  ASSERT sy-subrc = 0. " todo, error handling

  CALL FUNCTION 'READ_PROGDIR'
    EXPORTING
      i_progname = lv_program
      i_state    = 'A'   " todo, possibility to handle inactive state
    IMPORTING
      e_progdir  = rs_report-progdir.

ENDMETHOD.


METHOD read_tadir.

  SELECT * FROM tadir
    INTO CORRESPONDING FIELDS OF TABLE rt_data
    WHERE devclass = '$TMP'
    AND author <> 'SAP'
    AND author <> 'DDIC'
    AND obj_name LIKE 'Z%'
    ORDER BY PRIMARY KEY.

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