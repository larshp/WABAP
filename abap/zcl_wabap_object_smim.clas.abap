CLASS zcl_wabap_object_smim DEFINITION
  PUBLIC
  FINAL
  CREATE PUBLIC.

  PUBLIC SECTION.

    INTERFACES zif_swag_handler.

    TYPES:
      BEGIN OF ty_smim,
        url    TYPE skwf_url,
        folder TYPE abap_bool,
      END OF ty_smim.

    METHODS read
      IMPORTING
        !iv_key        TYPE sdok_loid
      RETURNING
        VALUE(rs_data) TYPE ty_smim.
    METHODS read_content
      IMPORTING
        !iv_key           TYPE sdok_loid
      RETURNING
        VALUE(rv_content) TYPE xstring.
    METHODS save_content
      IMPORTING
        !iv_key     TYPE sdok_loid
        !iv_content TYPE xstring.
  PROTECTED SECTION.
  PRIVATE SECTION.
ENDCLASS.



CLASS ZCL_WABAP_OBJECT_SMIM IMPLEMENTATION.


  METHOD read.

    DATA: ls_io       TYPE skwf_io,
          lv_url      TYPE skwf_url,
          ls_smimloio TYPE smimloio.


    SELECT SINGLE * FROM smimloio INTO ls_smimloio
      WHERE loio_id = iv_key.                           "#EC CI_GENBUFF
    ASSERT sy-subrc = 0.

    IF ls_smimloio-lo_class = wbmr_c_skwf_folder_class.
      rs_data-folder = abap_true.
      ls_io-objtype = skwfc_obtype_folder.
    ELSE.
      ls_io-objtype = skwfc_obtype_loio.
    ENDIF.
    ls_io-class = ls_smimloio-lo_class.
    ls_io-objid = ls_smimloio-loio_id.

    CALL FUNCTION 'SKWF_NMSPC_IO_ADDRESS_GET'
      EXPORTING
        io  = ls_io
      IMPORTING
        url = rs_data-url.

  ENDMETHOD.


  METHOD read_content.

    DATA(ls_smim) = read( iv_key ).

    ASSERT ls_smim-folder = abap_false.

    DATA(li_api) = cl_mime_repository_api=>if_mr_api~get_api( ).

    li_api->get(
      EXPORTING
        i_url              = ls_smim-url
      IMPORTING
        e_content          = rv_content
      EXCEPTIONS
        parameter_missing  = 1
        error_occured      = 2
        not_found          = 3
        permission_failure = 4
        OTHERS             = 5 ).
    ASSERT sy-subrc = 0.

  ENDMETHOD.


  METHOD save_content.

    DATA(ls_data) = read( iv_key ).
    ASSERT ls_data-folder = abap_false.

    DATA(li_api) = cl_mime_repository_api=>if_mr_api~get_api( ).

    li_api->put(
      EXPORTING
        i_url                   = ls_data-url
        i_content               = iv_content
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

  ENDMETHOD.


  METHOD zif_swag_handler~meta.

    FIELD-SYMBOLS: <ls_meta> LIKE LINE OF rt_meta.


    APPEND INITIAL LINE TO rt_meta ASSIGNING <ls_meta>.
    <ls_meta>-summary   = 'Read SMIM'.
    <ls_meta>-url-regex = '/objects/SMIM/(\w*)/$'.
    APPEND 'IV_KEY' TO <ls_meta>-url-group_names.
    <ls_meta>-method    = zcl_swag=>c_method-get.
    <ls_meta>-handler   = 'READ'.

    APPEND INITIAL LINE TO rt_meta ASSIGNING <ls_meta>.
    <ls_meta>-summary   = 'Read SMIM content'.
    <ls_meta>-url-regex = '/objects/SMIM/(\w*)/content/$'.
    APPEND 'IV_KEY' TO <ls_meta>-url-group_names.
    <ls_meta>-method    = zcl_swag=>c_method-get.
    <ls_meta>-handler   = 'READ_CONTENT'.

    APPEND INITIAL LINE TO rt_meta ASSIGNING <ls_meta>.
    <ls_meta>-summary   = 'Save SMIM content'.
    <ls_meta>-url-regex = '/objects/SMIM/(\w*)/content/$'.
    APPEND 'IV_KEY' TO <ls_meta>-url-group_names.
    <ls_meta>-method    = zcl_swag=>c_method-post.
    <ls_meta>-handler   = 'SAVE_CONTENT'.

  ENDMETHOD.
ENDCLASS.
