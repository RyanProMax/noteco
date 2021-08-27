---
title: Divider - 分割线
group:
  title: Divider - 分割线
nav:
  title: Component
  path: /component
---

<API src='./index.tsx'></API>

## 使用示例

### 1. 基础应用 & 虚线

<code src="./demo/01.tsx"></code>

### 2. 垂直分割线

<code src="./demo/02.tsx"></code>

### 3. 设置分割线标题 & 位置

<code src="./demo/03.tsx"></code>

## 源码实现

### 1. index.tsx

```tsx | pure
import React from 'react';
import './index.less';

export interface DividerProps {
  /**
   * @description 自定义样式
   * @default -
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
  className,
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
```

### 2. index.less

```less
.noteco-divider {
  border-color: #dbdbdb;
  border-style: solid;
  border-width: 0;
  box-sizing: border-box;
  display: flex;

  &__is-horizontal {
    border-top-width: 1px;
    margin: 24px 0;
  }

  &__is-vertical {
    display: inline-block;
    border-left-width: 1px;
    height: 1em;
    margin: 0 12px;
    vertical-align: middle;
  }

  &__is-dashed {
    border-style: dashed;

    &::after {
      border-top-style: dashed !important;
    }
  }

  &__has-children {
    border-top-width: 0;
    font-size: 14px;
    position: relative;
    display: flex;
    align-items: center;

    &::after {
      position: absolute;
      display: block;
      content: '';
      width: 100%;
      top: 50%;
      border-top: 1px solid #dbdbdb;
      box-sizing: border-box;
      z-index: 1;
    }
  }

  &__children {
    position: absolute;
    white-space: nowrap;
    padding: 0 12px;
    background-color: #fff;
    z-index: 10;

    &--is-left {
      left: 5%;
    }
    &--is-center {
      left: 50%;
      transform: translateX(-50%);
    }
    &--is-right {
      right: 5%;
    }
  }
}
```

## 小作业

那么，由你来尝试扩展其他功能吧~

比如：通过 props 控制标题的样式。
