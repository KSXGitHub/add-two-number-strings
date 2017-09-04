
initfs () {
  rm -rfv $2
  $1 $2 && echo "created $2"
}

initdir () {
  initfs mkdir $1
}

[[ $SKIP_INIT_DIRS == 'false' ]] || {
  for dir in $(./sh/lib/init-dir-list.sh)
  do
    initdir $dir
  done
}
