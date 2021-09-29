---
title: OutlineAnimation
group:
  title: OutlineAnimation
nav:
  title: Animate Component
  path: /animate-component
---

# OutlineAnimation - 线条动画

具体实现参照：https://csscoco.com/inspiration/#/./3d/3d-count-number

<API src='./index.tsx'></API>

## 使用示例

<code src="./demo/index.tsx"></code>

## 源码实现

### index.tsx

```tsx | pure
import classnames from 'classnames';
import React, { ReactElement } from 'react';
import './index.less';

export interface Props {
  /**
   * @description 容器高度
   */
  width: number;
  /**
   * @description 容器宽度
   */
  height: number;
  /**
   * @description 注入自定义样式。可用于重写自定义动画
   */
  className?: string;
  /**
   * @description 线条样式
   */
  rectStyle?: object;
  /**
   * @description 子元素
   * @default (required)
   */
  children: ReactElement;
}

const OutlineAnimation: React.FC<Props> = ({
  width,
  height,
  className,
  rectStyle,
  children,
  ...rest
}) => {
  if (!width || !height) return children;

  return (
    <hgroup
      className={classnames('noteco-outline-animation', className)}
      style={{ width, height }}
      {...rest}
    >
      <svg
        viewBox={`0 0 ${width} ${height}`}
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        className="noteco-outline-animation__svg"
      >
        <rect
          className={classnames('noteco-outline-animation__shape')}
          style={{
            stroke: '#333',
            strokeWidth: '4px',
            strokeDasharray: `${width >> 1} ${
              (width + height) * 2 - (width >> 1)
            }`,
            strokeDashoffset: `${height + Math.round((width * 3) / 4)}`,
            ...rectStyle
          }}
          height={height}
          width={width}
        ></rect>
      </svg>
      {children}
    </hgroup>
  );
};

export default OutlineAnimation;
```

### index.less

```less
.noteco-outline-animation {
  position: relative;

  &__svg {
    position: absolute;
  }

  &__shape {
    fill: transparent;
  }

  &:hover &__shape {
    -webkit-animation: noteco-draw 1s ease-in-out forwards;
    animation: noteco-draw 1s ease-in-out forwards;
  }
}

@keyframes noteco-draw {
  to {
    stroke-dasharray: 1000 0;
    stroke-dashoffset: 0;
  }
}
```
