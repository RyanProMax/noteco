import React, { ChangeEvent, useState } from 'react';
import { Input } from 'noteco';

export default () => {
  const [inputVal, setInputVal] = useState('noteco-input');

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputVal(val);
  };
  return (
    <>
      <Input defaultValue={inputVal} maxLength={15} onChange={onChange} />
      <p>输出：{inputVal}</p>
    </>
  );
};
