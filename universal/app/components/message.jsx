import React from 'react';
import MessageStore from '../stores/message-store';
import classNames from 'classnames/bind';
import styles from './message.scss';
import { createComponent } from 'bdux'

const cssModule = classNames.bind(styles);

const getMessageClass = () => (
  cssModule({
    'message': true
  })
)

export const Message = ({ message }) => (
  <div className={getMessageClass()}>
    { message }
  </div>
);

export default createComponent(Message, {
  message: MessageStore
});
