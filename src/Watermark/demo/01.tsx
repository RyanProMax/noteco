import React from 'react';
import { Watermark } from 'noteco';

export default () => {
  return (
    <Watermark
      url="/noteco/images/favicon.svg"
      className="noteco-demo-watermark"
      content="@noteco"
    />
  );
};
