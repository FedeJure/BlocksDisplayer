import React from 'react'
import { Message } from 'semantic-ui-react'

const MetamaskScreen = () => (
  <Message>
    <Message.Header>Ups!</Message.Header>
    <p>
      Seems like you dont have metamask installed! You can switch to this <a href="https://metamask.io/download.html">link</a> to install:
    </p>
  </Message>
)

export default MetamaskScreen