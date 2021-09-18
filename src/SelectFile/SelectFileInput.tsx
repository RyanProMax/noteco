import React, { forwardRef } from 'react';

export interface SelectFileInputProps {}

const SelectFileInput = forwardRef<HTMLInputElement, SelectFileInputProps>(
  (props, ref) => {
    return (
      <input type="file" ref={ref} style={{ display: 'none' }} {...props} />
    );
  }
);

export default SelectFileInput;
