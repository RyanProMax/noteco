import React from 'react';
import './index.less';

/**
 * className: 自定义样式
 * type: 水平还是垂直
 * dashed: 是否虚线
 * children: 传入内容
 * orientation: 分割线内容的位置
 */

interface props {
  className: string;
  type: 'horizontal' | 'vertical';
  dashed: boolean;
  children: Element;
  orientation: 'left' | 'center' | 'right';
}

const Divider = ({
  className = '',
  type = 'horizontal',
  dashed = false,
  children,
  orientation = 'left',
}: props) => {
  // type - className 的对应关系
  const TYPE_TO_CLASS = {
    horizontal: 'noteco-divider__is-horizontal',
    vertical: 'noteco-divider__is-vertical',
  };
  // orientation - className 的对应关系
  const ORIENTATION_TO_CLASS = {
    left: 'noteco-divider__children--is-left',
    center: 'noteco-divider__children--is-center',
    right: 'noteco-divider__children--is-right',
  };

  // 收集容器样式 -> 数组
  const _className = ['noteco-divider'];
  className && _className.push(className);
  _className.push(TYPE_TO_CLASS[type]);
  dashed && _className.push('noteco-divider__is-dashed');
  children && _className.push('noteco-divider__has-children');

  const renderChildren = () => {
    if (!children) return;
    return (
      <div
        className={`noteco-divider__children ${ORIENTATION_TO_CLASS[orientation]}`}
      >
        {children}
      </div>
    );
  };

  return <div className={_className.join(' ')}>{renderChildren()}</div>;
};

export default Divider;
