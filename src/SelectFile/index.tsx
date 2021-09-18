import React, { ReactElement, useRef } from 'react';
import SelectFileInput from './SelectFileInput';

export interface SelectFileProps {
  accept?: string;
  children?: ReactElement;
  className: string;
  onChange: Function;
}

const SelectFile: React.FC<SelectFileProps> = ({
  children,
  className,
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const selectFile = () => {
    inputRef.current?.click();
  };

  return (
    <div
      className={className}
      onClick={selectFile}
      style={{ display: 'inline-block' }}
    >
      {children}
      <SelectFileInput ref={inputRef} {...rest} />
    </div>
  );
};
export default SelectFile;
