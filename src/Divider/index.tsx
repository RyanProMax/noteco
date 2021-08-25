import React from 'react';
import './index.less';

/**
 * className: 自定义样式
 * type: 水平还是垂直
 */
interface props {
  className: string;
  type: 'horizontal' | 'vertical';
}

const Divider = ({ className = '', type = 'horizontal' }: props) => {
  const TYPE_TO_CLASS = {
    horizontal: 'is-horizontal',
    vertical: 'is-vertical',
  };
  return (
    <div className={`noteco-divider ${className} ${TYPE_TO_CLASS[type]}`} />
  );
};

export default Divider;
