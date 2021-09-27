---
title: VirtualList - 虚拟列表
group:
  title: VirtualList - 虚拟列表
nav:
  title: Feat Component
  path: /feat-component
---

# VirtualList - 虚拟列表

虚拟列表是一种根据滚动容器元素的可视区域来渲染长列表数据中某一部分数据的技术。

## 前言

### 建议

生产环境中推荐使用成熟的库，如：

- react-window
- react-virtualized

### 普通列表 VS 虚拟列表

<code src="./demo/01.tsx"></code>

通过控制台，可以看到：

- 普通列表一次性渲染 1000 个 DOM 元素，因此耗时较长，约 36 ms。
- 虚拟列表通过计算，只渲染可视区域部分 DOM 元素，约 1.3 ms。
- 后续滚动列表时，普通列表不会再次触发视图更新；而虚拟列表由于需要重新计算可视区域元素，因此会频繁触发视图更新。

## 简易实现虚拟列表

接下来将简易实现虚拟列表，并且会有两种情况：元素定高 & 元素不定高。

## 【元素定高】FixedSizeList

<API exports='["FixedSizeList"]' />

### 使用示例

<code src="./demo/02.tsx"></code>

## 【元素不定高】VariableSizeList

<API exports='["VariableSizeList"]' />

### 使用示例

<code src="./demo/03.tsx"></code>

## 源码实现

### FixedSizeList.tsx

```tsx | pure
import React, { createElement, ReactElement, useState } from 'react';

export interface FixedSizeListProps {
  children: ReactElement;
  /**
   * @description 列表可视区域宽度
   * @default -
   */
  width?: number;
  /**
   * @description 列表可视区域高度
   */
  height: number;
  /**
   * @description 列表数据长度
   */
  itemCount: number;
  /**
   * @description 列表行高
   */
  itemSize: number;
}

const FixedSizeList: React.FC<FixedSizeListProps> | null = ({
  children,
  width,
  height,
  itemCount,
  itemSize
}) => {
  if (!height || !itemCount || !itemSize || typeof children !== 'function') {
    console.error('请按要求设置属性');
    return null;
  }

  // 开始节点 index
  const [startIndex, setStartIndex] = useState(0);
  // 偏移量
  const [startOffset, setStartOffset] = useState(0);
  // 可视区域节点个数
  const visibleCount = Math.ceil(height / itemSize);
  // 结束节点 index
  const endIndex = startIndex + visibleCount;
  // 总高度 -> 计算滑动条
  const actualHeight = itemCount * itemSize;

  // 每行元素样式
  const getItemStyle = () => {
    return {
      height: itemSize,
      width: '100%'
    };
  };

  const onScroll = (event: any) => {
    // 获取滑动条位置
    const scrollTop = event.target.scrollTop;
    // 计算起始节点
    setStartIndex(Math.floor(scrollTop / itemSize));
    // 计算偏移量
    setStartOffset(scrollTop - (scrollTop % itemSize));
  };

  const render = () => {
    const items = [];
    for (let index = startIndex; index < endIndex; index++) {
      items.push(
        createElement(children, {
          index,
          style: getItemStyle(),
          key: index
        })
      );
    }
    return items;
  };

  return (
    <div
      style={{
        position: 'relative',
        overflow: 'auto',
        willChange: 'transform',
        width,
        height
      }}
      onScroll={onScroll}
    >
      <div style={{ height: actualHeight }} />
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          transform: `translateY(${startOffset}px)`
        }}
      >
        {render()}
      </div>
    </div>
  );
};

export default FixedSizeList;
```

### VariableSizeList.tsx

```tsx | pure
/**
 * 整体思路：
 * 1. 根据预估行高、数据长度计算得到总高度 -> 撑开容器，展示滚动条
 * 2. 维护一个列表用于计算元素位置
 * 3. 滚动时根据真实 DOM 更新上述列表，从而修正元素位置
 */

import React, { createElement, ReactElement, useRef, useState } from 'react';

export interface VariableSizeListProps {
  children: ReactElement;
  /**
   * @description 列表可视区域宽度
   * @default -
   */
  width?: number;
  /**
   * @description 列表可视区域高度
   */
  height: number;
  /**
   * @description 列表数据长度
   */
  itemCount: number;
  /**
   * @description 列表预估行高
   */
  itemSize?: number;
}

const VariableSizeList: React.FC<VariableSizeListProps> | null = ({
  children,
  width,
  height,
  itemCount,
  itemSize = 50
}) => {
  if (!height || !itemCount || !itemSize || typeof children !== 'function') {
    console.error('请按要求设置属性');
    return null;
  }

  // 开始节点 index
  const [startIndex, setStartIndex] = useState(0);
  // 偏移量
  const [startOffset, setStartOffset] = useState(0);
  // 记录元素的位置、高度
  const [position, setPosition] = useState(
    new Array(itemCount).fill(0).map((_, idx) => ({
      index: idx,
      top: idx * itemSize,
      bottom: (idx + 1) * itemSize,
      height: itemSize,
      isComputed: false
    }))
  );
  // 结束节点 index
  const _endIndex = position.findIndex(
    (i) => i.bottom >= position[startIndex].top + height
  );
  const endIndex = _endIndex > -1 ? _endIndex : position.length - 1;
  // 存储对应元素
  const elements = useRef<HTMLElement[]>([]);
  // 总高度
  const actualHeight = position[position.length - 1].bottom;

  // 每行元素样式
  const getItemStyle = () => {
    return {
      width: '100%'
    };
  };

  const onScroll = (event: any) => {
    // 获取当前可视窗口节点
    const currentEls: HTMLElement[] = Array.from(
      event.target.children[1].children
    );
    currentEls.forEach((_el) => {
      const _index = Number(_el.getAttribute('data-index') || 0);
      elements.current[_index] = _el;
    });
    // 获取滑动条位置
    const scrollTop = event.target.scrollTop;
    // 计算起始节点
    const _startIndex = position.findIndex((i) => i.top >= scrollTop);
    setStartIndex(_startIndex);
    // 计算偏移量
    setStartOffset(_startIndex >= 1 ? position[_startIndex - 1]?.bottom : 0);
    // 更新元素位置
    updatePosition();
  };

  const render = () => {
    const items = [];
    for (let index = startIndex; index <= endIndex; index++) {
      items.push(
        createElement(children, {
          index,
          style: getItemStyle(),
          key: index,
          'data-index': index
        })
      );
    }
    return items;
  };

  // 更新元素位置
  const updatePosition = () => {
    setPosition((_position) => {
      for (let index = startIndex; index < _position.length; index++) {
        // 已计算直接跳过
        if (_position[index].isComputed) break;
        // 无对应真实 DOM 跳过
        const el = elements.current[index];
        if (!el) break;

        const target = _position[index];
        // 通过真实 DOM 高度来更新元素高度
        target.height = el.clientHeight;
        index > 0 && (target.top = _position[index - 1].bottom);
        target.bottom = target.top + target.height;
        target.isComputed = true;
      }
      return _position;
    });
  };

  return (
    <div
      style={{
        position: 'relative',
        overflow: 'auto',
        willChange: 'transform',
        width,
        height
      }}
      onScroll={onScroll}
    >
      <div style={{ height: actualHeight }} />
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          transform: `translateY(${startOffset}px)`
        }}
      >
        {render()}
      </div>
    </div>
  );
};

export default VariableSizeList;
```
