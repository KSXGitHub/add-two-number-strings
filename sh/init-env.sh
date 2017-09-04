
initfs () {
  rm -rfv $2
  $1 $2 && echo "created $2"
}

initdir () {
  initfs mkdir $1
}

[[ $DO_INIT_DIRS != 'true' ]] || {
  for dir in $(./sh/lib/init-dir-list.sh)
  do
    initdir $dir
  done
}
