#!/bin/bash
#CHANGE_THIS_ACCORDING_TO_YOUR_ENV
JS_TEST_PATH="/Users/ibm/git/JsUnitTesting/WebContent/js"
cd "$JS_TEST_PATH/js-test/jasmine/build_scripts"
export PATH=$PATH:/usr/local/bin
cd $JS_TEST_PATH
# Execute command once !!!
karma start config.js --single-run
