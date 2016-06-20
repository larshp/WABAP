
CLASS ltcl_pretty DEFINITION FOR TESTING
  DURATION SHORT
  RISK LEVEL HARMLESS
  FINAL.

  PUBLIC SECTION.
    METHODS: run FOR TESTING.

ENDCLASS.       "ltcl_Pretty

CLASS ltcl_pretty IMPLEMENTATION.

  METHOD run.

    DATA: lt_code TYPE TABLE OF string,
          lv_code TYPE string.


    APPEND 'if foo = bar.' TO lt_code.
    APPEND 'write bar.' TO lt_code.
    APPEND 'endif.' TO lt_code.

    CONCATENATE LINES OF lt_code
      INTO lv_code
      SEPARATED BY cl_abap_char_utilities=>newline.

    lv_code = zcl_wabap_pretty_printer=>run( lv_code ).

    SPLIT lv_code AT cl_abap_char_utilities=>newline
      INTO TABLE lt_code.

    cl_abap_unit_assert=>assert_equals(
      act = lt_code[ 2 ]
      exp = '  WRITE bar.' ).

  ENDMETHOD.

ENDCLASS.