url=$([[ -n "$1" ]] && echo "$1" || echo $OPEN_URL)
browserlist=(
  $BROWSER_EXEC $BROWSER
  chrome google-chrome google-chrome-stable
  chromium firefox mozilla-firefox
)

for browser in ${browserlist[@]}; do
  [[ -n $browser ]] && (
    $browser $url
  ) && {
    echo "→ $browser $url"
    exit 0
  }
done

code=$?
echo 'Browser not found.' >&2
exit $code
