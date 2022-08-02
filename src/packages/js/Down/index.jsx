import React from 'react';
import { saveAs } from 'file-saver';
import JSZip from 'JSZip';
// 模拟后端返回 blob
export const Demo1 = () => {
  function aDownload1() {
    // 模拟后端返回 blob
    const blob = new Blob(['hello', 'world!'], { type: 'text/plain' });
    const a = document.createElement('a');
    // 设置文件名为test
    a.download = 'test';
    a.href = window.URL.createObjectURL(blob);
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    // 释放内存
    window.URL.revokeObjectURL(a.href);
    // 移除a元素
    document.body.removeChild(a);
  }
  return <span onClick={aDownload1}>点击下载</span>;
};

// base64下载
export const Demo2 = () => {
  function Download() {
    // 模拟后端返回 base64
    const base64 =
      'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTgyNzA1MzI3OTkyIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjIwNzAiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNNTExLjk5OTc4NyA1MTEuOTk5Nzg3bS01MTEuOTk5Nzg3IDBhNTExLjk5OTc4NyA1MTEuOTk5Nzg3IDAgMSAwIDEwMjMuOTk5NTczIDAgNTExLjk5OTc4NyA1MTEuOTk5Nzg3IDAgMSAwLTEwMjMuOTk5NTczIDBaIiBmaWxsPSIjNzc5MEE1IiBwLWlkPSIyMDcxIj48L3BhdGg+PHBhdGggZD0iTTM1OS42MzcxODMgODAyLjgxNTY2NWwtMTUyLjc4OTI2OSA4My4zMjc5NjZjLTguOTU5OTk2IDQuOTA2NjY1LTE3LjAyMzk5MyAxMC44Nzk5OTUtMjQuNTMzMzIzIDE3LjQ1MDY1OUE1MDkuNjEwNDU0IDUwOS42MTA0NTQgMCAwIDAgNTExLjk5OTc4NyAxMDIzLjk5OTU3M2MxMjQuNzE0NjE1IDAgMjM4LjkzMzIzNC00NC42MjkzMTUgMzI3Ljc2NTE5Ni0xMTguNjk4NjE3YTEzNS41NTE5NDQgMTM1LjU1MTk0NCAwIDAgMC0yNi45MjI2NTUtMTguMDQ3OTkybC0xNjMuNjI2NTk5LTgxLjc5MTk2NmE2Mi4zNzg2NDEgNjIuMzc4NjQxIDAgMCAxLTM0LjQ3NDY1Mi01NS44MDc5Nzd2LTY0LjE3MDY0YzQuNjA3OTk4LTUuMjQ3OTk4IDkuODU1OTk2LTExLjk0NjY2MiAxNS40ODc5OTQtMTkuODgyNjU4YTM3Ni40MDUxNzYgMzc2LjQwNTE3NiAwIDAgMCA1MC44NTg2NDUtMTAyLjQ4NTI5MWMyMC45NDkzMjUtNi40ODUzMzEgMzYuNDM3MzE4LTI1Ljg1NTk4OSAzNi40MzczMTgtNDguODk1OTh2LTY4LjUyMjYzOGMwLTE1LjA2MTMyNy02LjY5ODY2NC0yOC41MDEzMjEtMTcuMTA5MzI2LTM3Ljk3MzMxN3YtOTguOTg2NjI2UzcyMC43MjUwMzMgMTU0LjUzODYwMiA1MTEuOTk5Nzg3IDE1NC41Mzg2MDJjLTIwOC42ODI1OCAwLTE4OC4zNzMyNTUgMTU0LjExMTkzNi0xODguMzczMjU1IDE1NC4xMTE5MzZ2OTkuMDcxOTU5YTUxLjA3MTk3OSA1MS4wNzE5NzkgMCAwIDAtMTcuMDY2NjYgMzcuOTczMzE3djY4LjQ3OTk3MmMwIDE4LjA0Nzk5MiA5LjQyOTMyOSAzMy45MTk5ODYgMjMuNjM3MzI0IDQzLjA5MzMxNWEzMzkuOTY3ODU4IDMzOS45Njc4NTggMCAwIDAgNjEuOTUxOTc0IDEyOC4xNzA2MTN2NjIuNTkxOTc0YzAgMjIuNzgzOTkxLTEyLjUwMTMyOCA0My44MTg2NDgtMzIuNTExOTg3IDU0Ljc0MTMxMXoiIGZpbGw9IiNDQUQ5RTYiIHAtaWQ9IjIwNzIiPjwvcGF0aD48L3N2Zz4=';
    console.log(base64, 'base64');
    const a = document.createElement('a');
    // 设置文件名为test
    a.download = 'test';
    a.href = base64;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    // 移除a元素
    document.body.removeChild(a);
  }
  return <span onClick={Download}>点击下载</span>;
};
//ShowSaveFilePicker API 下载
export const Demo3 = () => {
  async function getNewFileHandle(filename, blob) {
    const opts = {
      types: [
        {
          // 数组类型，表示允许保存的文件类型列表。数组中的每一项是包含以下属性的配置对象：
          description: 'txt', //(可选)用于描述允许保存文件类型类别。
          accept: { 'text/plain': ['.txt'] }, // 是一个对象，该对象的 key 是 MIME 类型，值是文件扩展名列表。
        },
        {
          description: 'jpeg file',
          accept: { 'image/jpeg': ['.jpeg'] },
        },
      ],
      suggestedName: filename, // 建议下载文件名
    };
    try {
      const handle = await window.showSaveFilePicker(opts);
      const writable = await handle.createWritable();
      await writable.write(blob);
      await writable.close();
      return handle;
    } catch (error) {
      console.log(error?.message);
    }
  }
  function showSaveFilePickerDownload() {
    // 模拟blob文件
    const blob = new Blob(['hello', 'world!'], { type: 'text/plain' });
    getNewFileHandle('test.txt', blob);
  }
  return <span onClick={showSaveFilePickerDownload}>点击下载</span>;
};

//FileSaver下载
export const Demo4 = () => {
  const download = () => {
    const blob = new Blob(['Hello, world!'], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, 'helloworld.txt');
  };

  return <span onClick={download}>点击下载</span>;
};

//jszip 下载

export const Demo5 = () => {
  const download = () => {
    var zip = new JSZip();
    const imgData =
      'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTgyNzA1MzI3OTkyIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjIwNzAiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNNTExLjk5OTc4NyA1MTEuOTk5Nzg3bS01MTEuOTk5Nzg3IDBhNTExLjk5OTc4NyA1MTEuOTk5Nzg3IDAgMSAwIDEwMjMuOTk5NTczIDAgNTExLjk5OTc4NyA1MTEuOTk5Nzg3IDAgMSAwLTEwMjMuOTk5NTczIDBaIiBmaWxsPSIjNzc5MEE1IiBwLWlkPSIyMDcxIj48L3BhdGg+PHBhdGggZD0iTTM1OS42MzcxODMgODAyLjgxNTY2NWwtMTUyLjc4OTI2OSA4My4zMjc5NjZjLTguOTU5OTk2IDQuOTA2NjY1LTE3LjAyMzk5MyAxMC44Nzk5OTUtMjQuNTMzMzIzIDE3LjQ1MDY1OUE1MDkuNjEwNDU0IDUwOS42MTA0NTQgMCAwIDAgNTExLjk5OTc4NyAxMDIzLjk5OTU3M2MxMjQuNzE0NjE1IDAgMjM4LjkzMzIzNC00NC42MjkzMTUgMzI3Ljc2NTE5Ni0xMTguNjk4NjE3YTEzNS41NTE5NDQgMTM1LjU1MTk0NCAwIDAgMC0yNi45MjI2NTUtMTguMDQ3OTkybC0xNjMuNjI2NTk5LTgxLjc5MTk2NmE2Mi4zNzg2NDEgNjIuMzc4NjQxIDAgMCAxLTM0LjQ3NDY1Mi01NS44MDc5Nzd2LTY0LjE3MDY0YzQuNjA3OTk4LTUuMjQ3OTk4IDkuODU1OTk2LTExLjk0NjY2MiAxNS40ODc5OTQtMTkuODgyNjU4YTM3Ni40MDUxNzYgMzc2LjQwNTE3NiAwIDAgMCA1MC44NTg2NDUtMTAyLjQ4NTI5MWMyMC45NDkzMjUtNi40ODUzMzEgMzYuNDM3MzE4LTI1Ljg1NTk4OSAzNi40MzczMTgtNDguODk1OTh2LTY4LjUyMjYzOGMwLTE1LjA2MTMyNy02LjY5ODY2NC0yOC41MDEzMjEtMTcuMTA5MzI2LTM3Ljk3MzMxN3YtOTguOTg2NjI2UzcyMC43MjUwMzMgMTU0LjUzODYwMiA1MTEuOTk5Nzg3IDE1NC41Mzg2MDJjLTIwOC42ODI1OCAwLTE4OC4zNzMyNTUgMTU0LjExMTkzNi0xODguMzczMjU1IDE1NC4xMTE5MzZ2OTkuMDcxOTU5YTUxLjA3MTk3OSA1MS4wNzE5NzkgMCAwIDAtMTcuMDY2NjYgMzcuOTczMzE3djY4LjQ3OTk3MmMwIDE4LjA0Nzk5MiA5LjQyOTMyOSAzMy45MTk5ODYgMjMuNjM3MzI0IDQzLjA5MzMxNWEzMzkuOTY3ODU4IDMzOS45Njc4NTggMCAwIDAgNjEuOTUxOTc0IDEyOC4xNzA2MTN2NjIuNTkxOTc0YzAgMjIuNzgzOTkxLTEyLjUwMTMyOCA0My44MTg2NDgtMzIuNTExOTg3IDU0Ljc0MTMxMXoiIGZpbGw9IiNDQUQ5RTYiIHAtaWQ9IjIwNzIiPjwvcGF0aD48L3N2Zz4=';
    zip.file('Hello.txt', 'Hello World\n');
    var img = zip.folder('images');
    img.file('smile.gif', imgData);
    zip.generateAsync({ type: 'blob' }).then(function (content) {
      // see FileSaver.js
      saveAs(content, 'example.zip');
    });
  };
  return <span onClick={download}>点击下载zip</span>;
};

// 大文件下载对比（单线程下载和多线程下载）
//单线程
function download(url) {
  const req = new XMLHttpRequest();
  req.open('GET', url, true);
  req.responseType = 'blob';
  req.onload = function (oEvent) {
    const content = req.response;
    const aTag = document.createElement('a');
    aTag.download = '360_0388.jpg';
    const blob = new Blob([content]);
    const blobUrl = URL.createObjectURL(blob);
    aTag.href = blobUrl;
    aTag.click();
    URL.revokeObjectURL(blob);
    console.timeEnd('直接下载');
  };
  req.send();
}

// 本地图片转base64，注意链接是本地链接不能是网络地址。
export const img2base64 = (imgUrl) => {
  let image = new Image();
  image.src = imgUrl;
  return new Promise((resolve) => {
    image.onload = () => {
      let canvas = document.createElement('canvas');
      canvas.width = image.width;
      canvas.height = image.height;
      var context = canvas.getContext('2d');
      context.drawImage(image, 0, 0, image.width, image.height);
      let dataUrl = canvas.toDataURL('image/png');
      resolve(dataUrl);
    };
  });
};
