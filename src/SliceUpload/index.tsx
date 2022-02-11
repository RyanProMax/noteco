import React, { ChangeEventHandler, useState } from 'react';

export interface SliceUploadProps {
  /**
   * @description 切片大小
   */
  size: number;
  /**
   * @description 选择文件回调
   */
  onChange: Function;
}

const SliceUpload: React.FC<SliceUploadProps> = ({
  size = 10 * 1024 * 1024,
  onChange = (data) => {}
}) => {
  const splitChunk = (file: File) => {
    const chunkList = [];
    for (let cur = 0, idx = 0; cur < file.size; cur += size, idx++) {
      const hash = `${file.name}_${idx}`;
      const chunk = file.slice(cur, cur + size);
      const formData = new FormData();
      formData.append('chunk', chunk);
      formData.append('hash', hash);
      formData.append('filename', file.name);
      chunkList.push({
        index: idx,
        hash,
        chunk,
        formData
      });
    }
    return chunkList;
  };

  const handleChangeFile: ChangeEventHandler<HTMLInputElement> = (e): void => {
    if (e.target.files && e.target.files.length) {
      const [file] = e.target.files;
      const chunkList = splitChunk(file);
      onChange({
        originFile: file,
        chunkList
      });
    }
  };

  return (
    <>
      <input type="file" onChange={handleChangeFile} />
    </>
  );
};

export default SliceUpload;
