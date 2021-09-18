import React, { ChangeEvent } from 'react';
import { Avatar } from 'noteco';

export default () => {
  return (
    <Avatar
      onChange={(e: ChangeEvent) => {
        console.log('onChange: ', e);
      }}
    />
  );
};
