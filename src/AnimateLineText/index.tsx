import React from 'react';
import './index.less';

export interface Props {
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
  content,
  strokeWidth = '3px',
  ...rest
}) => {
  const random = Date.now();

  return (
    <svg className="noteco-animation-line-text" {...rest}>
      <symbol id={`noteco-text__${random}`}>
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
            xlinkHref={`#noteco-text__${random}`}
            className="noteco-animation-line-text__text-copy"
            style={{ strokeWidth: strokeWidth }}
          ></use>
        ))}
      </g>
    </svg>
  );
};

export default AnimateLineText;
