---
title: BreakText
group:
  title: BreakText
nav:
  title: Animate Component
  path: /animate-component
---

# BreakText - 故障文字

具体实现参照：https://csscoco.com/inspiration/#/./others/word-glitch

<API src='./index.tsx'></API>

## 使用示例

<code src="./demo/01.tsx"></code>

## 源码实现

### index.tsx

```tsx | pure
import classnames from 'classnames';
import React from 'react';
import './index.less';

export interface Props {
  /**
   * @description 文字内容
   */
  text: string;
  /**
   * @description 文字缩放。由于动画采用固定的 px 值及绝对定位进行设计，因此尽量通过 scale 调整文字大小，字体基准大小为 36px。
   */
  scale: number;
  /**
   * @description 容器样式
   * @default -
   */
  className: string;
  /**
   * @description 文字样式
   * @default -
   */
  textStyle: object;
}

const BreakText: React.FC<Props> = ({
  text = 'noteco',
  className,
  scale = 2.4,
  textStyle,
  ...rest
}) => {
  return (
    <div className={classnames('noteco-break-text', className)} {...rest}>
      <div
        className="noteco-break-text__content"
        data-word={text}
        style={{
          transform: `translate(-50%, -50%) scale(${scale})`,
          ...textStyle
        }}
      >
        {text}
        <div className="noteco-break-text__white"></div>
      </div>
    </div>
  );
};

export default BreakText;
```

### index.less

```less
.noteco-break-text {
  position: relative;
  background-color: #000;
  height: 120px;

  &__content {
    position: absolute;
    top: 50%;
    left: 50%;
    font-size: 36px;
    font-family: Raleway, Verdana, Arial;
    color: #fff;

    &::before {
      content: attr(data-word);
      position: absolute;
      top: 0;
      left: 0.5px;
      height: 0px;
      color: rgba(255, 255, 255, 0.9);
      overflow: hidden;
      z-index: 2;
      animation: noteco-redShadow 1s ease-in infinite;
      filter: contrast(200%);
      text-shadow: 1px 0 0 red;
    }

    &::after {
      content: attr(data-word);
      position: absolute;
      top: 0;
      left: -3px;
      height: 36px;
      color: rgba(255, 255, 255, 0.8);
      overflow: hidden;
      z-index: 3;
      background: rgba(0, 0, 0, 0.9);
      animation: noteco-redHeight 1.5s ease-out infinite;
      filter: contrast(200%);
      text-shadow: -1px 0 0 cyan;
      mix-blend-mode: darken;
    }
  }

  &__white {
    position: absolute;
    left: -10px;
    width: 100%;
    height: 3px;
    // background: #000;
    z-index: 4;
    animation: noteco-whiteMove 3s ease-out infinite;
  }
}

@keyframes noteco-redShadow {
  20% {
    height: 32px;
  }
  60% {
    height: 6px;
  }
  100% {
    height: 42px;
  }
}

@keyframes noteco-redHeight {
  20% {
    height: 42px;
  }
  35% {
    height: 12px;
  }
  50% {
    height: 40px;
  }
  60% {
    height: 20px;
  }
  70% {
    height: 34px;
  }
  80% {
    height: 22px;
  }
  100% {
    height: 0px;
  }
}

@keyframes noteco-whiteMove {
  8% {
    top: 38px;
  }
  14% {
    top: 8px;
  }
  20% {
    top: 42px;
  }
  32% {
    top: 2px;
  }
  99% {
    top: 30px;
  }
}
```
