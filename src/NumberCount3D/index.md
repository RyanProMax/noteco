---
title: NumberCount3D
group:
  title: NumberCount3D
nav:
  title: Animate Component
  path: /animate-component
---

# NumberCount3D - 3D 数字

具体实现参照：https://csscoco.com/inspiration/#/./3d/3d-count-number

<API src='./index.tsx'></API>

## 使用示例

<code src="./demo/01.tsx"></code>

## 源码实现

### index.tsx

```tsx | pure
import classnames from 'classnames';
import React, { Fragment, useEffect, useState } from 'react';
import './index.less';

export interface Props {
  /**
   * @description 输入数字
   */
  number: number;
  /**
   * @description 是否需要 3D 旋转效果
   */
  rotate: boolean;
  /**
   * @description 注入自定义样式
   */
  className: string;
}

const NumberCount3D: React.FC<Props> = ({
  number = 0,
  rotate = true,
  className,
  ...rest
}) => {
  if (typeof number !== 'number') throw new Error('请输入数字');
  const numberArray = String(number).split('');
  const { length } = numberArray;

  return (
    <div className={classnames('noteco-number-count-3d', className)} {...rest}>
      <div
        className={classnames(
          'noteco-number-count-3d__wrapper',
          'noteco-number-count-3d__preserve',
          {
            'noteco-number-count-3d__rotate': rotate
          }
        )}
      >
        <div
          className={classnames('noteco-number-count-3d__preserve', {
            'noteco-number-count-3d__number-rotate': rotate
          })}
        >
          {numberArray.map((number, index) => (
            <Fragment key={index}>
              <div
                className={classnames(
                  'noteco-number-count-3d__number',
                  'noteco-number-count-3d__preserve'
                )}
                data-digit={number}
              >
                {new Array(7).fill(true).map((_, idx) => (
                  <div
                    key={idx}
                    className={classnames(
                      'noteco-number-count-3d__number-line',
                      'noteco-number-count-3d__preserve',
                      'noteco-number-count-3d__number-line--translate'
                    )}
                  ></div>
                ))}
              </div>
              {length - index > 1 && (length - index) % 3 === 1 && (
                <div
                  className={classnames(
                    'noteco-number-count-3d__comma',
                    'noteco-number-count-3d__preserve'
                  )}
                ></div>
              )}
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NumberCount3D;
```

### index.less

```less
@width: 3vw;
@commaWidth: 0.5vw;
@gap: 0.2vw;
@dis: -0.2vw;
@secTop: @width + @gap;
@thirdTop: @width * 2 + @gap * 2;
@secLineTop: @width + @gap * 2;
@screenTop: @width * 4;
@numberMargin: 3vw;
@transformDistance: 50px;
@bgColor: rgba(255, 255, 255, 1);
@scale: 0.9;
@normalColor: #181919;
@lightColor: #34eabc;
@drakColor: #3c4444;
@lightShadow: 0 0 1vw #0bfdfd, inset 0 0 0.125vmin #0bfdfd;
@drakShadow: 0 0 1vw #425454;
@animTime: 10s;

.noteco-number-count-3d {
  background: #000;
  padding-top: 3vw;
  overflow: hidden;

  &__wrapper {
    position: relative;
    text-align: center;
    z-index: 999;
  }

  &__rotate {
    animation: noteco-rotateReverse @animTime infinite linear;
  }

  &__number-rotate {
    transform: rotateX(10deg) rotateZ(0);
    animation: noteco-rotate @animTime infinite linear;
  }

  &__preserve {
    transform-style: preserve-3d;
    perspective: 1000px;
  }

  &__number {
    position: relative;
    width: @width;
    height: @screenTop;
    display: inline-block;
    margin: @numberMargin @numberMargin 0 0;

    &-line {
      position: absolute;
      top: 0;
      left: 0;
      width: @width;
      height: 2px;
      background: @normalColor;

      &:nth-child(1) {
        transform: translateY(@dis);
      }

      &:nth-child(2) {
        top: @secTop;
      }

      &:nth-child(3) {
        transform: rotate(180deg) translateY(@dis);
        top: @thirdTop;
      }

      &:nth-child(4) {
        transform: rotate(90deg) translateY(-@dis);
        transform-origin: 0 center;
      }

      &:nth-child(5) {
        transform: rotate(-90deg) translateY(-@dis);
        transform-origin: 100% center;
      }

      &:nth-child(6) {
        top: @secLineTop;
        transform: rotate(90deg) translateY(-@dis);
        transform-origin: 0 center;
      }

      &:nth-child(7) {
        top: @secLineTop;
        transform: rotate(-90deg) translateY(-@dis);
        transform-origin: 100% center;
      }

      &::before,
      &::after {
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        background-color: @lightColor;
        box-shadow: @lightShadow;
      }

      &::before {
        left: 0;
        right: 50%;
        transition: all 0.5s ease-in;
      }

      &::after {
        left: 50%;
        right: 0;
        transition: all 0.5s ease-out;
      }

      &--translate {
        &::before,
        &::after {
          transform: translateZ(@transformDistance);
        }
      }
    }

    &[data-digit='1'] &-line:nth-child(1),
    &[data-digit='1'] &-line:nth-child(2),
    &[data-digit='1'] &-line:nth-child(3),
    &[data-digit='1'] &-line:nth-child(4),
    &[data-digit='1'] &-line:nth-child(6),
    &[data-digit='2'] &-line:nth-child(4),
    &[data-digit='2'] &-line:nth-child(7),
    &[data-digit='3'] &-line:nth-child(4),
    &[data-digit='3'] &-line:nth-child(6),
    &[data-digit='4'] &-line:nth-child(1),
    &[data-digit='4'] &-line:nth-child(3),
    &[data-digit='4'] &-line:nth-child(6),
    &[data-digit='5'] &-line:nth-child(5),
    &[data-digit='5'] &-line:nth-child(6),
    &[data-digit='6'] &-line:nth-child(5),
    &[data-digit='7'] &-line:nth-child(2),
    &[data-digit='7'] &-line:nth-child(3),
    &[data-digit='7'] &-line:nth-child(4),
    &[data-digit='7'] &-line:nth-child(6),
    &[data-digit='9'] &-line:nth-child(6),
    &[data-digit='0'] &-line:nth-child(2) {
      &::before,
      &::after {
        transform: translateZ(25px);
        background: @drakColor;
        box-shadow: @drakShadow;
      }
    }
  }

  &__comma {
    position: relative;
    top: -@thirdTop + 1vw;
    display: inline-block;
    width: 1vw;
    height: 1vw;
    background: @normalColor;
    margin: @numberMargin @numberMargin 0 -0.8vw;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: @lightColor;
      transform: translateZ(@transformDistance);
    }

    &::after {
      content: '';
      position: absolute;
      bottom: -0.8vw;
      right: 0.3vw;
      border: 0.2vw solid transparent;
      border-top: 0.9vw solid @lightColor;
      transform: translateZ(@transformDistance) rotate(40deg);
    }
  }
}

@keyframes noteco-rotate {
  0% {
    transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg);
  }
  50% {
    transform: rotateX(10deg) rotateY(20deg) rotateZ(180deg);
  }
  100% {
    transform: rotateX(0deg) rotateY(0deg) rotateZ(360deg);
  }
}

@keyframes noteco-rotateReverse {
  0% {
    transform: rotateZ(0deg);
  }
  100% {
    transform: rotateZ(-360deg);
  }
}
```
