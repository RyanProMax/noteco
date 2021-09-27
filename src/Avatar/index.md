---
title: Avatar - 选择头像
group:
  title: Avatar - 选择头像
nav:
  title: UI Component
  path: /ui-component
---

# Avatar - 选择头像

<API src='./index.tsx'></API>

## 使用示例

<code src="./demo/01.tsx"></code>

## 源码实现

### index.tsx

```tsx | pure
import React, { ChangeEvent, useState } from 'react';
import './index.less';
import SelectFile from '../SelectFile';

export interface AvatarProps {
  /**
   * @description 参考原生回调
   */
  onChange?: Function;
}

interface NotecoFile extends File {
  loading: boolean;
  src?: string;
}

const Loading = () => (
  <div style={{}}>
    <img
      src="/noteco/images/empty-image.svg"
      style={{ width: 100, height: 100 }}
    />
  </div>
);

const ImagePreview = ({ file }: { file: NotecoFile }) => {
  return file.loading ? (
    <Loading />
  ) : (
    <img
      src={file.src}
      alt={file.name}
      style={{
        height: '100%',
        width: '100%',
        objectFit: 'cover'
      }}
    />
  );
};

const cloneFile = (file: File, loading: boolean, src?: string) => {
  const clone = Object.assign(
    new File([file], file.name, {
      type: file.type
    }),
    {
      loading,
      src
    }
  );
  return clone;
};

const Avatar: React.FC<AvatarProps> = ({
  onChange = (e: ChangeEvent) => {}
}) => {
  const [curFile, setCurFile] = useState<NotecoFile | null>(null);

  const handleChange = (e: any) => {
    const { files } = e.target;
    const file = files[0];

    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e: any) => {
      setCurFile((file) => cloneFile(file as File, false, e.target.result));
    };
    setCurFile(() => cloneFile(file, true));
    onChange(e);
  };

  return (
    <SelectFile
      className="noteco-avatar"
      accept=".jpg, .png"
      onChange={handleChange}
    >
      <div className="noteco-avatar__wrapper">
        {curFile ? <ImagePreview file={curFile} /> : '+'}
      </div>
    </SelectFile>
  );
};

export default Avatar;
```

### index.less

```less
.noteco-avatar {
  &__wrapper {
    display: inline-flex;
    width: 280px;
    height: 280px;
    justify-content: center;
    align-items: center;
    border: 1px dashed #dbdbdb;
    border-radius: 6px;
    color: #999;
    font-size: 48px;
    font-weight: 100;
    cursor: pointer;
    transition: all 0.25s;
    overflow: hidden;

    &:hover {
      border-color: #4569d4;
      color: #4569d4;
    }
  }
}
```
