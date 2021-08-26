import React from 'react';
import './index.less';

export interface DividerProps {
  /**
   * @description 自定义样式
   */
  className: string;
  /**
   * @description 水平还是垂直
   * @default horizontal
   */
  type: 'horizontal' | 'vertical';
  /**
   * @description 是否虚线
   * @default false
   */
  dashed: boolean;
  children: Element;
  /**
   * @description 分割线内容的位置
   * @default left
   */
  orientation: 'left' | 'center' | 'right';
}

const Divider: React.FC<DividerProps> = ({
  className = '',
  type = 'horizontal',
  dashed = false,
  children,
  orientation = 'left',
}) => {
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
