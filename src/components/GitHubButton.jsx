import React from 'react'
import IconButton from 'material-ui/IconButton'
import Icon from 'mui-icons/cmdi/github'

export default function GitHubButton (props) {
  const {
    buttonProps = {},
    iconProps = {},
    ...rest
  } = props

  return <IconButton {...buttonProps} {...rest}>
    <Icon {...iconProps} />
  </IconButton>
}
