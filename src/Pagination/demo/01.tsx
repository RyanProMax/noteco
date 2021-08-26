import React, { useState } from 'react';
import { Pagination, Divider } from 'noteco';

export default () => {
  const [current, setCurrent] = useState(2);
  const pageSize = 10;
  const total = 125;

  return (
    <>
      <div style={{ textAlign: 'center' }}>
        current: {current}
        <Divider type="vertical" />
        pageSize: {pageSize}
        <Divider type="vertical" />
        total: {total}
      </div>
      <Divider />
      <Pagination
        current={current}
        pageSize={pageSize}
        total={total}
        onChange={(_current: number) => {
          setCurrent(_current);
        }}
      />
    </>
  );
};
