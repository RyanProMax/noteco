import React from 'react';
import { OutlineAnimation } from 'noteco';
import './index.less';

export default () => {
  return (
    <OutlineAnimation
      width={320}
      height={60}
      className="noteco-demo__outline-animaiton"
    >
      <div
        style={{
          width: 320,
          height: 60,
          lineHeight: '60px',
          textAlign: 'center',
          fontSize: 26
        }}
      >
        HOVER ME
      </div>
    </OutlineAnimation>
  );
};
