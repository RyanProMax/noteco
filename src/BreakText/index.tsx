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
