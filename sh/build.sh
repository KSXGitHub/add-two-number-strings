echo 'Building...'
source ./sh/init-env.sh || exit 1
( [ -z $DEFAULT_BUILD_SCRIPT ] || bash -c "$DEFAULT_BUILD_SCRIPT" > ./out/$DEFAULT_BUILD_SCRIPT_PRODUCT ) &
( [ -z $DEFAULT_BUILD_URL ] || ( curl -L $DEFAULT_BUILD_URL > ./script.tmp && ./script.tmp > ./out/$DEFAULT_BUILD_URL_PRODUCT ) ) &
echo 'Build is succeed by default'
echo 'Done'
