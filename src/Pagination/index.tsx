import React, { memo, useEffect, useMemo, useRef, useState } from 'react';
import './index.less';

/**
 *
 * current: 当前页
 * pageSize: 每页展示几条数据
 * total: 数据总数
 * center: 是否居中（flex 布局），默认居中
 * onChange(current): 当前页改变后的回调，传入新的当前页
 *
 */
interface props {
  current: number;
  pageSize: number;
  total: number;
  center: boolean;
  onChange: Function;
}

const Pagination = memo(
  ({
    current = 1,
    pageSize = 10,
    total = 0,
    center = true,
    onChange = () => {},
  }: props) => {
    const isInit = useRef(true);
    const pageNums = total === 0 ? 1 : Math.ceil(total / pageSize);
    const [page, setPage] = useState(Math.min(current, pageNums));

    // 监听当前页变更，触发 onChange
    useEffect(() => {
      // 首次不触发
      if (isInit.current) {
        isInit.current = false;
        return;
      }
      onChange(page);
    }, [page]);

    // 页数
    const pageNumToArray = useMemo(
      () => new Array(pageNums).fill(0).map((_, idx) => idx + 1),
      [pageNums],
    );

    // 计算省略号中间页码范围
    const pageNumAvailable =
      pageNums <= 2
        ? []
        : pageNumToArray.filter((pageNum) => {
            // 省略号中间展示页数
            const RANGE = 3;
            // 范围左侧边界值
            let min = Math.max(2, page - ((RANGE - 1) >> 1));
            min = Math.min(min, Math.max(2, pageNums - RANGE));
            // 范围右侧边界值
            const max = Math.min(pageNums - 1, min + RANGE - 1);
            return pageNum >= min && pageNum <= max;
          });

    // 是否当前页
    const isCurrent = (pageNum: number) => page === pageNum;
    // 当前页是否首页
    const isFirstPage = page === 1;
    // 当前页是否尾页
    const isLastPage = page === pageNums;

    // 点击切换页码前后箭头
    const clickPageTurner = (tag: 0 | 1) => {
      if (tag === 0) {
        if (page === 1) {
          return;
        }
        setPage((_page) => _page - 1);
      } else if (tag === 1) {
        if (page === pageNums) {
          return;
        }
        setPage((_page) => _page + 1);
      }
    };

    // 点击页码
    const clickPage = (pageNum: number) => {
      setPage(pageNum);
    };

    return (
      <div
        className="noteco-pagination"
        style={{ justifyContent: center ? 'center' : '' }}
      >
        <div
          className="pagination-summary"
          style={{ marginRight: '9px' }}
        >{`共 ${total} 条`}</div>
        <div
          className={`page-turner ${isFirstPage ? 'is-disabled' : ''}`}
          style={{ marginRight: '11px' }}
          onClick={() => {
            clickPageTurner(0);
          }}
        >
          ＜
        </div>
        <div
          className={`pagination-number ${
            isCurrent(1) ? 'is-current-page' : ''
          }`}
          onClick={() => {
            clickPage(1);
          }}
        >
          1
        </div>
        <div
          style={{
            margin: '0 4px',
            display: pageNumAvailable[0] > 2 ? '' : 'none',
          }}
        >
          ┄
        </div>

        {pageNumAvailable.map((pageNum) => (
          <div
            key={pageNum}
            className={`pagination-number ${
              isCurrent(pageNum) ? 'is-current-page' : ''
            }`}
            onClick={() => {
              clickPage(pageNum);
            }}
          >
            {pageNum}
          </div>
        ))}
        <div
          style={{
            margin: '0 4px',
            display:
              pageNumAvailable[pageNumAvailable.length - 1] < pageNums - 1
                ? ''
                : 'none',
          }}
        >
          ┄
        </div>
        <div
          className={`pagination-number ${
            isCurrent(pageNums) ? 'is-current-page' : ''
          }`}
          style={{ display: pageNums <= 1 ? 'none' : '' }}
          onClick={() => {
            clickPage(pageNums);
          }}
        >
          {pageNums}
        </div>
        <div
          className={`page-turner ${isLastPage ? 'is-disabled' : ''}`}
          style={{ marginLeft: '11px' }}
          onClick={() => {
            clickPageTurner(1);
          }}
        >
          ＞
        </div>
        <div
          className="pagination-summary"
          style={{ marginLeft: '9px' }}
        >{`共 ${pageNums} 页`}</div>
      </div>
    );
  },
);

export default Pagination;
