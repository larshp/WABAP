REPORT zwabap_installer.

PARAMETERS: p_zip  TYPE text_512 OBLIGATORY,
            p_devc TYPE devclass DEFAULT '$WABAP_FRONTEND' OBLIGATORY.

CLASS lcl_app DEFINITION FINAL.

  PUBLIC SECTION.
    CLASS-METHODS:
      run,
      initialization,
      select_file.

  PRIVATE SECTION.
    TYPES: BEGIN OF ty_file,
             path     TYPE string,
             filename TYPE string,
             data     TYPE xstring,
           END OF ty_file.
    TYPES: ty_files_tt TYPE STANDARD TABLE OF ty_file WITH DEFAULT KEY.

    CLASS-METHODS:
      read_file
        RETURNING VALUE(rv_xstr) TYPE xstring,
      unzip
        IMPORTING iv_xstr         TYPE xstring
        RETURNING VALUE(rt_files) TYPE ty_files_tt,
      create_folder,
      create_mimes
        IMPORTING it_files TYPE ty_files_tt,
      filename
        IMPORTING iv_str             TYPE string
        RETURNING VALUE(rv_filename) TYPE string.

ENDCLASS.

CLASS lcl_app IMPLEMENTATION.

  METHOD filename.

    DATA: lv_path TYPE string.                              "#EC NEEDED


    IF iv_str CA '/'.
      FIND REGEX '(.*/)(.*)' IN iv_str
        SUBMATCHES lv_path rv_filename.
      ASSERT sy-subrc = 0.
    ELSE.
      rv_filename = iv_str.
    ENDIF.
    TRANSLATE rv_filename TO LOWER CASE.

  ENDMETHOD.

  METHOD unzip.

    DATA: lo_zip    TYPE REF TO cl_abap_zip,
          lv_xstr   TYPE xstring,
          lt_splice TYPE cl_abap_zip=>t_splice_entries.

    FIELD-SYMBOLS: <ls_splice> LIKE LINE OF lt_splice,
                   <ls_file>   LIKE LINE OF rt_files.


    CREATE OBJECT lo_zip.
    lo_zip->load( EXPORTING
                    zip             = iv_xstr
                  EXCEPTIONS
                    zip_parse_error = 1
                    OTHERS          = 2 ).
    ASSERT sy-subrc = 0.

    lt_splice = cl_abap_zip=>splice( iv_xstr ).

    LOOP AT lt_splice ASSIGNING <ls_splice>.
      lo_zip->get(
        EXPORTING
          name                    = <ls_splice>-name
        IMPORTING
          content                 = lv_xstr
        EXCEPTIONS
          zip_index_error         = 1
          zip_decompression_error = 2
          OTHERS                  = 3 ).
      ASSERT sy-subrc = 0.

      APPEND INITIAL LINE TO rt_files ASSIGNING <ls_file>.
      <ls_file>-path     = '/'.
      <ls_file>-filename = filename( <ls_splice>-name ).
      <ls_file>-data     = lv_xstr.

    ENDLOOP.

  ENDMETHOD.

  METHOD initialization.

    CALL FUNCTION 'RS_SUPPORT_SELECTIONS'
      EXPORTING
        report               = sy-cprog
        variant              = 'DEFAULT'
      EXCEPTIONS
        variant_not_existent = 01
        variant_obsolete     = 02
        ##fm_subrc_ok. "#EC CI_SUBRC

  ENDMETHOD.

  METHOD read_file.

    TYPES: ty_hex200 TYPE x LENGTH 200.

    DATA: lv_length   TYPE i,
          lv_filename TYPE string,
          lt_data     TYPE STANDARD TABLE OF ty_hex200.


    lv_filename = p_zip.

    cl_gui_frontend_services=>gui_upload(
      EXPORTING
        filename                = lv_filename
        filetype                = 'BIN'
      IMPORTING
        filelength              = lv_length
      CHANGING
        data_tab                = lt_data
      EXCEPTIONS
        file_open_error         = 1
        file_read_error         = 2
        no_batch                = 3
        gui_refuse_filetransfer = 4
        invalid_type            = 5
        no_authority            = 6
        unknown_error           = 7
        bad_data_format         = 8
        header_not_allowed      = 9
        separator_not_allowed   = 10
        header_too_long         = 11
        unknown_dp_error        = 12
        access_denied           = 13
        dp_out_of_memory        = 14
        disk_full               = 15
        dp_timeout              = 16
        not_supported_by_gui    = 17
        error_no_gui            = 18
        OTHERS                  = 19 ).
    ASSERT sy-subrc = 0.

    CONCATENATE LINES OF lt_data INTO rv_xstr IN BYTE MODE.

    rv_xstr = rv_xstr(lv_length).

  ENDMETHOD.

  METHOD run.

    create_mimes( unzip( read_file( ) ) ).

    WRITE: / 'Done'(001).

  ENDMETHOD.

  METHOD create_folder.

    DATA: li_api TYPE REF TO if_mr_api.


    li_api = cl_mime_repository_api=>if_mr_api~get_api( ).

    li_api->create_folder(
      EXPORTING
        i_url              = zcl_wabap_service=>c_url
        i_description      = 'wabap'
        i_dev_package      = p_devc
      EXCEPTIONS
        parameter_missing  = 1
        error_occured      = 2
        cancelled          = 3
        permission_failure = 4
        folder_exists      = 5
        OTHERS             = 6 ) ##NO_TEXT.
    ASSERT sy-subrc = 0 OR sy-subrc = 5.

  ENDMETHOD.

  METHOD create_mimes.

    DATA: lv_url TYPE string,
          li_api TYPE REF TO if_mr_api.

    FIELD-SYMBOLS: <ls_file> LIKE LINE OF it_files.


    create_folder( ).

    li_api = cl_mime_repository_api=>if_mr_api~get_api( ).

    LOOP AT it_files ASSIGNING <ls_file>.
      lv_url = zcl_wabap_service=>c_url && '/' && <ls_file>-filename.

      WRITE: / lv_url.

      li_api->put(
        EXPORTING
          i_url                   = lv_url
          i_content               = <ls_file>-data
          i_dev_package           = p_devc
        EXCEPTIONS
          parameter_missing       = 1
          error_occured           = 2
          cancelled               = 3
          permission_failure      = 4
          data_inconsistency      = 5
          new_loio_already_exists = 6
          is_folder               = 7
          OTHERS                  = 8 ).
      ASSERT sy-subrc = 0.

    ENDLOOP.

  ENDMETHOD.

  METHOD select_file.

    DATA: lt_filetable TYPE filetable,
          lv_rc        TYPE i.


    cl_gui_frontend_services=>file_open_dialog(
      EXPORTING
        default_filename        = '*.zip'
      CHANGING
        file_table              = lt_filetable
        rc                      = lv_rc
      EXCEPTIONS
        file_open_dialog_failed = 1
        cntl_error              = 2
        error_no_gui            = 3
        not_supported_by_gui    = 4
        OTHERS                  = 5 ).
    ASSERT sy-subrc = 0.

    IF lv_rc = 1.
      p_zip = lt_filetable[ 1 ]-filename.
    ENDIF.

  ENDMETHOD.

ENDCLASS.

AT SELECTION-SCREEN ON VALUE-REQUEST FOR p_zip.
  lcl_app=>select_file( ).

INITIALIZATION.
  lcl_app=>initialization( ).

START-OF-SELECTION.
  lcl_app=>run( ).