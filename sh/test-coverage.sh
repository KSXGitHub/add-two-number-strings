export JEST_NO_COVERAGE=false
bash ./sh/jest.sh && cat ./coverage/lcov.info | coveralls
