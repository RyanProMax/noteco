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
