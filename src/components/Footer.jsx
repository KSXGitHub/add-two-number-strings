import React from 'react'
import Typography from 'material-ui/Typography'

const style = {
  fontFamily: "'Roboto', sans-serif",
  fontSize: '0.75em',
  textAlign: 'center'
}

export default function Footer () {
  return <footer style={style}>
    <section><Typography>
      Copyright © 2017 <a href='https://github.com/KSXGitHub'>Hoàng Văn Khải</a>
      <br />
      All rights reserved.
    </Typography></section>
  </footer>
}
