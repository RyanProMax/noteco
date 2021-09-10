---
title: Input - 输入框
group:
  title: UI 组件
  path: /ui
  order: 1
nav:
  title: Component
  path: /component
---

<API src='./index.tsx'></API>

## 使用示例

<code src="./demo/01.tsx"></code>

## 源码实现

### 1. index.tsx

```tsx | pure
/**
 * 由于输入框在使用中文输入法时，输入的拼音也会被算作输入框内容，从而影响字数统计。
 * 因此在此通过非受控组件 + onComposition 相关 API 的方式进行判断。
 *
 * 整体思路
 * 1. 通过 defaultValue + onChange 属性进行父子交互
 *  1.1 defaultValue 设置输入框默认值
 *  1.2 onChange 返回输入事件，如果设置字数限制，会对 event.target.value 进行截取
 * 2. 通过 CompositionEvent 拦截中文输入进行时
 *
 */

import React, { useState, useRef, CompositionEvent } from 'react';
import classnames from 'classnames';
import './index.less';

export interface InputProps {
  /**
   * @description 输入框默认值
   * @default -
   */
  defaultValue: string;
  /**
   * @description 最大长度
   * @default -
   */
  maxLength: number;
  /**
   * @description 自定义样式
   * @default -
   */
  className: string;
  /**
   * @description 对应原生 onChange 回调，添加了中文输入法兼容处理
   * @default (event) => {}
   */
  onChange: Function;
}

const Input: React.FC<InputProps> = ({
  defaultValue,
  className,
  maxLength,
  onChange,
  ...rest
}) => {
  const [val, setVal] = useState(defaultValue);
  const isInputting = useRef(false);
  const dataCounter = maxLength ? `${val.length} / ${maxLength}` : '';

  const handleComposition = (e: CompositionEvent<HTMLInputElement>) => {
    if (e.type === 'compositionstart') {
      isInputting.current = true;
    }
    if (e.type === 'compositionend') {
      isInputting.current = false;
      handleChange(e);
    }
  };

  const handleChange = (e: any) => {
    if (isInputting.current) return;
    if (e.target.value) {
      e.target.value = e.target.value.substr(0, maxLength);
    }
    setVal(e.target.value);
    onChange(e);
  };

  return (
    <div
      className={classnames('notoco-input__wrapper', className, {
        'notoco-input__counter': maxLength,
        'notoco-input__counter--limit': val.length >= maxLength,
      })}
      data-counter={dataCounter}
    >
      <input
        className="notoco-input"
        defaultValue={val}
        onChange={handleChange}
        onCompositionStart={handleComposition}
        onCompositionEnd={handleComposition}
        {...rest}
      />
    </div>
  );
};

export default Input;
```

### 2. index.less

```less
.notoco-input {
  &__wrapper {
    max-width: 320px;
    position: relative;
    display: flex;
    align-items: center;

    .notoco-input {
      display: inline-block;
      width: 100%;
      height: 32px;
      padding: 4px 11px;
      border: 1px solid #dbdbdb;
      background: none;
      font-size: 14px;
      transition: border 0.3s;
      outline: none;
      box-sizing: border-box;

      &:hover {
        border-color: #5468ff;
      }

      &:focus {
        border-color: #5468ff;
      }
    }
  }

  &__counter {
    &::after {
      content: attr(data-counter);
      display: inline-block;
      position: absolute;
      right: 10px;
      font-size: 12px;
      color: rgba(0, 0, 0, 0.8);
    }

    &--limit {
      &::after {
        color: #fe2c55;
      }
    }
  }
}
```
