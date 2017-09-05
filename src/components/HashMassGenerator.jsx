import React from 'react'
import HashGenerator from './HashGenerator.jsx'

export const DEFAULT_CONTAINER = ({children}) => (<span>{children}</span>)
export const DEFAULT_ARGORITHM_LIST = ['md5', 'sha1', 'sha256', 'sha512']

export default function HashMassGenerator (props) {
  const {
    container: Container = DEFAULT_CONTAINER,
    item: Item = DEFAULT_CONTAINER,
    algorithmList = DEFAULT_ARGORITHM_LIST,
    data = '',
    encoding = 'utf8'
  } = props

  return <Container>{
    algorithmList.map((algorithm, index) => (
      <Item algorithm={algorithm} index={index} key={index}><label>
        {algorithm}:&nbsp;
        <HashGenerator
          data={data}
          encoding={encoding}
        />
      </label></Item>
    ))
  }</Container>
}
