import React from 'react';
import { AnimateLineSimpleText } from 'noteco';
import './index.css';

export default () => (
  <AnimateLineSimpleText
    text="noteco"
    style={{ width: 600, height: 180 }}
    textStyle={{ fontSize: 120, fontWeight: 700, letterSpacing: '8px' }}
    className="noteco-animate-line-simple-text__demo"
  />
);
