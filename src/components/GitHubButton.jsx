import React from 'react'
import IconButton from 'material-ui/IconButton'
import Icon from 'mui-icons/cmdi/github'

export const DEFAULT_ICON_STYLE = {
  fill: 'white',
  color: 'white'
}

export default function GitHubButton (props) {
  const {
    buttonProps = {},
    iconProps = {},
    iconStyle = {},
    ...rest
  } = props

  return <IconButton
    iconStyle={{
      ...DEFAULT_ICON_STYLE,
      ...iconStyle
    }}
    {...buttonProps}
    {...rest}
  >
    <Icon {...iconProps} />
  </IconButton>
}
