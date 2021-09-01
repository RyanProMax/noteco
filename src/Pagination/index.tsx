import React, { useEffect, useMemo, useRef, useState } from 'react';
import './index.less';

export interface PaginationProps {
  /**
   * @description 当前页
   * @default 1
   */
  current: number;
  /**
   * @description 每页展示几条数据
   * @default 10
   */
  pageSize: number;
  /**
   * @description 数据总数
   * @default 0
   */
  total: number;
  /**
   * @description 分页器位置（flex 布局）
   * @default center
   */
  position?: 'left' | 'center' | 'right';
  /**
   * @description 当前页改变后的回调，传入新的当前页
   */
  onChange: Function;
}

const Pagination: React.FC<PaginationProps> = ({
  current = 1,
  pageSize = 10,
  total = 0,
  position = 'center',
  onChange = (page: number) => {},
}) => {
  /**
   *
   * 逻辑部分
   *
   */
  const isInit = useRef(true); // 是否首次渲染
  const totalPages = total === 0 ? 1 : Math.ceil(total / pageSize); // 页数
  const [page, setPage] = useState(Math.min(current, totalPages)); // 当前页

  // 监听当前页变更，触发 onChange
  useEffect(() => {
    // 首次不触发
    if (isInit.current) {
      isInit.current = false;
      return;
    }
    onChange(page);
  }, [page]);

  // 定义页数数组
  const pageNumToArray = useMemo(
    () => new Array(totalPages).fill(0).map((_, idx) => idx + 1),
    [totalPages],
  );

  // 计算省略号中间页码范围
  const pageNumAvailable =
    totalPages <= 2
      ? []
      : pageNumToArray.filter((pageNum) => {
          // 省略号中间展示页数
          const RANGE = 3;
          // 范围左侧边界值
          let min = Math.max(2, page - ((RANGE - 1) >> 1));
          min = Math.min(min, Math.max(2, totalPages - RANGE));
          // 范围右侧边界值
          const max = Math.min(totalPages - 1, min + RANGE - 1);
          return pageNum >= min && pageNum <= max;
        });

  // 点击切换页码前后箭头
  const clickArrowButton = (direction: 'left' | 'right') => {
    if (direction === 'left') {
      if (page === 1) {
        return;
      }
      setPage((_page) => _page - 1);
    }
    if (direction === 'right') {
      if (page === totalPages) {
        return;
      }
      setPage((_page) => _page + 1);
    }
  };

  // 点击页码
  const clickPage = (pageNum: number) => {
    setPage(pageNum);
  };

  /**
   *
   * 样式部分
   *
   */

  // wrapper 样式
  const notecoPaginationClass = () => {
    return `noteco-pagination noteco-pagination--${position}`;
  };

  // 上一页/下一页箭头样式
  const arrowClass = (direction: 'left' | 'right') => {
    const _className = ['noteco-pagination__turner'];
    if (direction === 'left') {
      page === 1 && _className.push('noteco-pagination__button--disabled');
    }
    if (direction === 'right') {
      page === totalPages &&
        _className.push('noteco-pagination__button--disabled');
    }
    return _className.join(' ');
  };

  // 页数按钮样式
  const pageNumberClass = (currentPage: number) => {
    const _className = ['noteco-pagination__number'];
    page === currentPage &&
      _className.push('noteco-pagination__number--selected');
    return _className.join(' ');
  };

  // 省略号样式
  const ellipsisClass = (direction: 'left' | 'right') => {
    const _className = ['noteco-pagination__ellipsis'];
    if (direction === 'left') {
      pageNumAvailable[0] <= 2 && _className.push('noteco-pagination--hide');
    }
    if (direction === 'right') {
      pageNumAvailable[pageNumAvailable.length - 1] >= totalPages - 1 &&
        _className.push('noteco-pagination--hide');
    }
    return _className.join(' ');
  };

  return (
    <div className={notecoPaginationClass()}>
      <div className="noteco-pagination__summary">{`共 ${total} 条`}</div>
      <div
        className={arrowClass('left')}
        onClick={() => {
          clickArrowButton('left');
        }}
      >
        ＜
      </div>
      <div
        className={pageNumberClass(1)}
        onClick={() => {
          clickPage(1);
        }}
      >
        1
      </div>
      <div className={ellipsisClass('left')}>┄</div>

      {pageNumAvailable.map((pageNum) => (
        <div
          key={pageNum}
          className={pageNumberClass(pageNum)}
          onClick={() => {
            clickPage(pageNum);
          }}
        >
          {pageNum}
        </div>
      ))}
      <div className={ellipsisClass('right')}>┄</div>

      <div
        className={pageNumberClass(totalPages)}
        style={{ display: totalPages <= 1 ? 'none' : '' }}
        onClick={() => {
          clickPage(totalPages);
        }}
      >
        {totalPages}
      </div>
      <div
        className={arrowClass('right')}
        onClick={() => {
          clickArrowButton('right');
        }}
      >
        ＞
      </div>
      <div className="noteco-pagination__summary">{`共 ${totalPages} 页`}</div>
    </div>
  );
};

export default Pagination;
