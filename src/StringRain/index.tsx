import classnames from 'classnames';
import React, { ReactElement, useEffect } from 'react';
import './index.scss';

export interface Props {
  /**
   * @description 字体大小
   */
  fontSize: number;
  /**
   * @description 字符雨列数，最大值 50
   */
  col: number;
  /**
   * @description 字符雨颜色
   */
  color: string;
  /**
   * @description 注入自定义样式
   */
  className?: string;
  children: ReactElement;
}

const StringRain: React.FC<Props> = ({
  children,
  col = 50,
  fontSize = 16,
  color = 'rgb(179, 255, 199)',
  className,
  ...rest
}) => {
  // 计算布局
  useEffect(() => {
    document.body.style.setProperty('--string-rain-color', color);
  }, []);

  return (
    <div className={classnames('noteco-string-rain', className)} {...rest}>
      <div className="noteco-string-rain__wrapper" style={{ fontSize }}>
        {new Array(col).fill(0).map((_, idx) => (
          <p key={idx} />
        ))}
      </div>
      {children}
    </div>
  );
};

export default StringRain;
