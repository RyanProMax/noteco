---
title: SliceUpload - 切片上传
group:
  title: SliceUpload - 切片上传
nav:
  title: Feat Component
  path: /feat-component
---

# SliceUpload - 切片上传

大文件切片上传、断点续传。

参考：https://juejin.cn/post/6844904046436843527

<API src='./index.tsx'></API>

## 使用示例

<code src="./demo/01.tsx"></code>

## 源码实现

### index.tsx

```tsx | pure
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
```

### 服务端代码

```js
const http = require('http');
const path = require('path');
const fse = require('fs-extra');
const multiparty = require('multiparty');

const server = http.createServer();
const UPLOAD_DIR = path.resolve(__dirname, 'data');

fse.emptyDir(UPLOAD_DIR);

const sleep = time => new Promise(resolve => setTimeout(resolve, time));

server.on('request', async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  if (req.method === 'OPTIONS') {
    res.status = 200;
    res.end();
    return;
  }

  const multipart = new multiparty.Form();
  multipart.parse(req, async (err, fields, files) => {
    if (err) return;
    const [chunk] = files.chunk;
    const [hash] = fields.hash;
    // const [filename] = fields.filename;
    await fse.move(chunk.path, `${UPLOAD_DIR}/${hash}`);

    const delay = Math.round(Math.random() * 5000);
    await sleep(delay);

    res.end(
      JSON.stringify({
        code: 200,
        message: `successful receive: ${hash}`
      })
    );
  });
});

server.listen(3001, () => console.log('server start: 3001'));
```
