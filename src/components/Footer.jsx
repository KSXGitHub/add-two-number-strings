import React from 'react'

const style = {
  fontFamily: "'Roboto', sans-serif",
  fontSize: '0.75em',
  textAlign: 'center'
}

export default function Footer () {
  return <footer style={style}>
    <p>
      Source code is available on&nbsp;
      <a href='https://github.com/KSXGitHub/react-hello-world'>GitHub</a>
    </p>
    <p>
      Copyright © 2017 <a href='https://github.com/KSXGitHub'>Hoàng Văn Khải</a>
      <br />
      All rights reserved.
    </p>
  </footer>
}
