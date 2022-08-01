import React, { useEffect } from 'react';
// a 标签下载-本地资源

export const Demo1 = () => {
  return (
    <a href="./n.jpg" download="test">
      直接下载图片
    </a>
  );
};
