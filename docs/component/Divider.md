## Divider - 分割线

### 1. 使用示例

#### 1.1 基础应用 & 虚线

```tsx
import React from 'react';
import { Divider } from 'noteco';

export default () => (
  <>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne
    merninisti licere mihi ista probare, quae sunt a te dicta? Refert tamen, quo
    modo.
    <Divider />
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne
    merninisti licere mihi ista probare, quae sunt a te dicta? Refert tamen, quo
    modo.
    <Divider dashed />
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne
    merninisti licere mihi ista probare, quae sunt a te dicta? Refert tamen, quo
    modo.
  </>
);
```

#### 1.2 垂直分割线

```tsx
import React from 'react';
import { Divider } from 'noteco';

export default () => (
  <>
    Label Left
    <Divider type="vertical" />
    Label Middle
    <Divider type="vertical" />
    Label Right
  </>
);
```

#### 1.3 设置分割线标题 & 位置

```tsx
import React from 'react';
import { Divider } from 'noteco';

export default () => (
  <>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne
    merninisti licere mihi ista probare, quae sunt a te dicta? Refert tamen, quo
    modo.
    <Divider>orientation - left</Divider>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne
    merninisti licere mihi ista probare, quae sunt a te dicta? Refert tamen, quo
    modo.
    <Divider dashed orientation="center">
      orientation - center - dashed
    </Divider>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne
    merninisti licere mihi ista probare, quae sunt a te dicta? Refert tamen, quo
    modo.
    <Divider orientation="right">orientation - center - right</Divider>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne
    merninisti licere mihi ista probare, quae sunt a te dicta? Refert tamen, quo
    modo.
  </>
);
```

### 2. 源码实现

#### 2.1 index.tsx

```tsx | pure
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
```

#### 2.2 index.less

```less
.noteco-divider {
  border-color: #dbdbdb;
  border-style: solid;
  border-width: 0;
  box-sizing: border-box;
  display: flex;

  &__is-horizontal {
    border-top-width: 1px;
    margin: 20px 0;
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

### 3. 小作业

那么，由你来尝试扩展其他功能吧，比如：通过 props 控制标题的样式。
