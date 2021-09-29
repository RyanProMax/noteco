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
   * @default -
   */
  className?: string;
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
