import React from 'react';
import MessageStore from '../stores/message-store';
import classNames from 'classnames/bind';
import styles from './message-react.scss';
import { createComponent } from 'bdux'

const cssModule = classNames.bind(styles);

export const Message = ({ message }) => (
  <div className={ cssModule({
      'message': true }) }>
    { message }
  </div>
);

export default createComponent(Message, {
  message: MessageStore
});
