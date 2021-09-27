---
title: AnimateLineSimpleText - 线性动画文字
group:
  title: AnimateLineSimpleText - 线性动画文字
nav:
  title: Animate Component
  path: /animate-component
---

# AnimateLineSimpleText - 线性动画文字

<API src='./index.tsx'></API>

## 使用示例

<code src="./demo/01.tsx"></code>

## 源码实现

### index.tsx

```tsx | pure
import React, { useLayoutEffect } from 'react';
import classnames from 'classnames';
import { insertCssRule } from '../utils/index';
import './index.less';

export interface Props {
  /**
   * @description 文字内容
   */
  text: string;
  /**
   * @description 原生 SVG - text 标签中的 x 属性
   */
  x: string;
  /**
   * @description 原生 SVG - text 标签中的 y 属性
   */
  y: string;
  /**
   * @description 原生 SVG className
   * @default -
   */
  className: string;
  /**
   * @description 原生 SVG - text 标签样式
   */
  textStyle?: object;
  /**
   * @description 边框颜色
   */
  borderColor: string;
  /**
   * @description 字体颜色
   */
  textColor: string;
}

const AnimateLineSimpleText: React.FC<Props> = ({
  text = 'Lorem',
  x = '50%',
  y = '70%',
  textStyle = {},
  borderColor = '#999',
  textColor = '#888',
  className,
  ...rest
}) => {
  const keyFrames = `@keyframes noteco-simple-stroke {
    0% {
      fill-opacity: 0;
      stroke: ${borderColor};
      stroke-opacity: 1;
      stroke-dashoffset: 25%;
      stroke-dasharray: 0 50%;
      stroke-width: 0.8;
    }
    50% {
      fill-opacity: 0;
      stroke: ${borderColor};
      stroke-opacity: 1;
      stroke-width: 1.2;
    }
    70% {
      fill-opacity: none;
      stroke: ${borderColor};
      stroke-opacity: 1;
      stroke-width: 1.5;
    }
    90%,
    100% {
      fill: ${textColor};
      fill-opacity: 1;
      stroke: ${borderColor};
      stroke-opacity: 0;
      stroke-dashoffset: -25%;
      stroke-dasharray: 50% 0;
      stroke-width: 0;
    }
  }
  `;
  useLayoutEffect(() => {
    insertCssRule(keyFrames);
  }, []);
  return (
    <svg
      className={classnames('noteco-animate-line-simple-text', className)}
      {...rest}
    >
      <text
        className="noteco-animate-line-simple-text__text"
        textAnchor="middle"
        x={x}
        y={y}
        style={textStyle}
      >
        {text}
      </text>
    </svg>
  );
};

export default AnimateLineSimpleText;
```

### index.less

```less
.noteco-animate-line-simple-text {
  &__text {
    animation: noteco-simple-stroke 5s infinite alternate;
  }
}
```
