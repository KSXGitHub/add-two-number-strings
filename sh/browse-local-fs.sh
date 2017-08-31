item=$(
  [[ -n "$1" ]] && (
    echo $1
  ) || [[ -n "$BROWSE_LOCAL_FS_ITEM" ]] && (
    echo $BROWSE_LOCAL_FS_ITEM
  ) || pwd
)

exec bash \
  ./sh/browser.sh \
  "$(realpath "$item")"
