---
title: AnimateLineText
group:
  title: AnimateLineText
nav:
  title: Animate Component
  path: /animate-component
---

# AnimateLineText - 动画线性文字

具体实现参照：https://csscoco.com/inspiration/#/./svg/svg-line-text-2

<API src='./index.tsx'></API>

## 使用示例

<code src="./demo/01.tsx"></code>

<code src="./demo/02.tsx"></code>

## 源码实现

### index.tsx

```tsx | pure
import React, { useRef } from 'react';
import './index.less';
export interface Props {
  /**
   * @description 用于定义原生 symbol 标签的 id，不设置则内部采用随机 ID
   */
  id: string;
  /**
   * @description 传入文字
   */
  content: {
    value: string;
    x: string;
    y: string;
    style: object;
  }[];
  /**
   * @description 字体宽度
   */
  strokeWidth: string;
}

const AnimateLineText: React.FC<Props> = ({
  id,
  content,
  strokeWidth = '3px',
  ...rest
}) => {
  const _id = useRef(`noteco-text__${Math.round(Math.random() * 10000)}`);

  return (
    <svg className="noteco-animation-line-text" {...rest}>
      <symbol id={id || _id.current}>
        {content.map(({ x, y, style, value }, idx) => (
          <text
            key={idx}
            textAnchor="middle"
            x={x || '50%'}
            y={y || '75%'}
            className="noteco-animation-line-text__text"
            style={style}
          >
            {value}
          </text>
        ))}
      </symbol>
      <g>
        {new Array(5).fill(0).map((_, idx) => (
          <use
            key={idx}
            xlinkHref={`#${id || _id.current}`}
            className="noteco-animation-line-text__text-copy"
            style={{ strokeWidth: strokeWidth }}
          ></use>
        ))}
      </g>
    </svg>
  );
};

export default AnimateLineText;
```

### index.less

```less
.noteco-animation-line-text {
  &__text {
    font-size: 100px;
  }

  &__text-copy {
    fill: none;
    stroke: #fff;
    stroke-dasharray: 7% 28%;
    stroke-width: 3px;
    -webkit-animation: stroke-offset 9s infinite linear;
    animation: stroke-offset 9s infinite linear;

    &:nth-child(1) {
      stroke: #360745;
      stroke-dashoffset: 7%;
    }
    &:nth-child(2) {
      stroke: #d61c59;
      stroke-dashoffset: 14%;
    }
    &:nth-child(3) {
      stroke: #e7d84b;
      stroke-dashoffset: 21%;
    }
    &:nth-child(4) {
      stroke: #efeac5;
      stroke-dashoffset: 28%;
    }
    &:nth-child(5) {
      stroke: #1b8798;
      stroke-dashoffset: 35%;
    }
  }
}

@-webkit-keyframes stroke-offset {
  50% {
    stroke-dashoffset: 35%;
    stroke-dasharray: 0 87.5%;
  }
}

@keyframes stroke-offset {
  50% {
    stroke-dashoffset: 35%;
    stroke-dasharray: 0 87.5%;
  }
}
```
