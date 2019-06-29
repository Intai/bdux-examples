import React from 'react';
import MessageStore from '../stores/message-store';
import classNames from 'classnames/bind';
import styles from './message.scss';
import { createUseBdux } from 'bdux'

const cssModule = classNames.bind(styles);

const getMessageClass = () => (
  cssModule({
    'message': true
  })
)

const useBdux = createUseBdux({
  message: MessageStore
})

export const Message = (props) => {
  const { state } = useBdux(props)
  return (
    <div className={getMessageClass()}>
      {state.message}
    </div>
  )
}

export default Message
