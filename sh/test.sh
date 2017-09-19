(
  export JEST_WEBPACK_SKIP=true

  if [[ $COVERALLS == 'true' ]];
    then
      bash ./sh/test-coverage.sh
    else
      bash ./sh/jest.sh
  fi
) && (
  bash ./sh/build.sh
)
