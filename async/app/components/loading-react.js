import React from 'react';
import LoadingStore from '../stores/loading-store';
import classNames from 'classnames/bind';
import styles from './loading-react.scss';
import { createComponent } from 'bdux'

const cssModule = classNames.bind(styles);

export const Loading = ({ loading }) => (
  <div className={ cssModule({
    'wrap': true }) }>

    <div className={ cssModule({
      'spinner': true,
      'loading': loading,
      'fa-spinner fa-spin': true }) }>
    </div>
  </div>
);

export default createComponent(Loading, {
  loading: LoadingStore
});
