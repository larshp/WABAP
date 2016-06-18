class ZCL_WABAP_OBJECT_PROG definition
  public
  final
  create public .

public section.

  types:
    BEGIN OF ty_prog,
           progdir TYPE progdir,
         END OF ty_prog .

  methods READ
    returning
      value(RS_DATA) type TY_PROG .
  methods CONSTRUCTOR
    importing
      !IV_NAME type TADIR-OBJ_NAME .
  methods ABAP
    returning
      value(RV_ABAP) type STRING .
protected section.
private section.

  data MV_NAME type PROGNAME .
ENDCLASS.



CLASS ZCL_WABAP_OBJECT_PROG IMPLEMENTATION.


  METHOD abap.

    DATA: lt_source TYPE STANDARD TABLE OF abaptxt255.

    CALL FUNCTION 'RPY_PROGRAM_READ'
      EXPORTING
        program_name     = mv_name
        with_lowercase   = abap_true
      TABLES
        source_extended  = lt_source
      EXCEPTIONS
        cancelled        = 1
        not_found        = 2
        permission_error = 3
        OTHERS           = 4.
    ASSERT sy-subrc = 0. " todo, error handling

    CONCATENATE LINES OF lt_source
      INTO rv_abap
      SEPARATED BY cl_abap_char_utilities=>newline.

  ENDMETHOD.


  METHOD constructor.

    mv_name = iv_name.

  ENDMETHOD.


  METHOD read.

    CALL FUNCTION 'READ_PROGDIR'
      EXPORTING
        i_progname = mv_name
        i_state    = 'A'   " todo, possibility to handle inactive state
      IMPORTING
        e_progdir  = rs_data-progdir.

  ENDMETHOD.
ENDCLASS.