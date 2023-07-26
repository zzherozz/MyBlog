---
nav:
  title: Components
  path: /JavaScript
---

### JavaScript-文件的下载

笔记中涉及的内容，参考[二进制](https://juejin.cn/post/7046313942938812424/),[前端上传与下载](https://juejin.cn/post/7074869887759286280),[文件下载，搞懂这 9 种场景就够了](https://juejin.cn/post/6989413354628448264#heading-6)个人觉得这三篇文章讲的很好，所以跟着学习一遍。 ![下载学习思维导图](./%E5%89%8D%E7%AB%AF%E4%BA%8C%E8%BF%9B%E5%88%B6%E6%A0%BC%E5%BC%8F.png)

### 文件下载

举个栗子：

```jsx
import React from 'react';
import { Demo1, Demo2, Demo3, Demo4, Demo5 } from './index.jsx';
export default () => {
  return (
    <>
      <div>
        blob url:
        <Demo1 />
      </div>
      <div>
        base64:
        <Demo2 />
      </div>
      <div>
        ShowSaveFilePicker:
        <Demo3 />
      </div>
      <div>
        FileSaver下载:
        <Demo4 />
      </div>
      <div>
        jszip 下载:
        <Demo5 />
      </div>
    </>
  );
};
```

### 超链接下载

#### 场景一： 使用 a 标签,直接下载一些本地资源。项目里面本地资源要放在 static 文件夹中。

```jsx | pure
<a href="./n.jpg" download="test">
  直接下载图片
</a>
```

#### 场景二： 下载服务器端的资源 （blob url/ base64 数据）

blob url 步骤：<br> 1.生成 blob url （使用 window.URL.createObjectURL(blob)）<br> 2.blob url 赋值给超链接的 href 属性<br> 3.模拟点击超链接进行下载<br>

base64 数据步骤：<br> 1.base64 数据赋值给超链接的 href 属性<br> 2.模拟点击超链接进行下载<br> base64 数据情况不是很多，并且当文件过大时， 要将 base64 转化为 blob 格式。

```jsx | pure
export const downloadFile = async (params, fileName) => {
  // 我们使用axios设置接口返回类型 responseType: "blob", 所以这里从后端返回的是blob。
  const results = await download(params); // 模拟接口返回
  const a = document.createElement('a');
  a.download = fileName + '.xlsx';
  // 生成blob url。这里可以使用Blob对象或者File对象
  a.href = window.URL.createObjectURL(results);
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click(); // 模拟点击事件
  // 释放内存 --清除方式只有页面unload()事件或者使用URL.revokeObjectURL(objectURL)手动清除 。
  window.URL.revokeObjectURL(a.href);
  document.body.removeChild(a);
};
```

```jsx | pure
export const downloadFile = (url) => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.responseType = 'blob';
  xhr.onload = function (oEvent) {
    const content = xhr.response;
    const aTag = document.body.createElement('a');
    aTag.download = '360_0388.jpg';
    const blob = new Blob([content]);
    const blobUrl = URL.createObjectURL(blob);
    aTag.href = blobUrl;
    aTag.click();
    URL.revokeObjectURL(blob);
    document.body.removeChild(elink);
    console.timeEnd('直接下载');
  };
  req.send();
};
```

### ShowSaveFilePicker API 下载

[ShowSaveFilePicker](https://developer.mozilla.org/en-US/docs/Web/API/window/showSaveFilePicker) 是一个新的 api，调用该方法后会显示允许用户选择保存路径的文件选择器。注意：兼容性一般

```jsx | pure
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
```

### FileSaver 下载

[FileSaver.js](https://github.com/eligrey/FileSaver.js)是在客户端保存文件的解决方案，非常适合在客户端上生成文件的 Web 应用程序。

```jsx | pure
// 主要使用Api
FileSaver.saveAs(
 Blob/File/Url,  // 它支持 Blob/File/Url 三种类型
 optional // DOMString filename, 文件名（可选）
 optional // Object { autoBom }表示配置对象（可选）。如果你需要 FlieSaver.js 自动提供 Unicode 文本编码提示字节顺序标记，则需要设置 { autoBom: true}。请注意，只有当blob类型的charset=utf-8设置时，才能执行此操作。
 // 注意：如果下载的 URL 地址与当前站点是同域的，则将使用 a[download] 方式下载。否则，会先使用 同步的 HEAD 请求 来判断是否支持 CORS 机制，若支持的话，将进行数据下载并使用 Blob URL 实现文件下载。如果不支持 CORS 机制的话，将会尝试使用 a[download] 方式下载。
)

// Blob数据源
const blob = new Blob(["Hello, world!"], {type: "text/plain;charset=utf-8"});
FileSaver.saveAs(blob, "helloworld.txt");
// File数据源
const file = new File(["Hello, world!"], {type: "text/plain;charset=utf-8"});
FileSaver.saveAs(file, "helloworld.txt");
//网络链接数据源
FileSaver.saveAs("https://httpbin.org/image", "image.jpg");
```

### jszip 下载

Jszip 可以让下载的文件转为 zip 格式。<br> Jszip 自己不具备下载功能，他只是提供了将文件压缩成 zip 包的功能，下载的话我们还是需要借助前面所说的 FileSaver.js。

```jsx | pure
const download = () => {
  var zip = new JSZip();
  zip.file('Hello.txt', 'Hello World\n'); // 添加文件,文件名Hello.txt 内容Hello World
  var img = zip.folder('images'); // 添加名字为images的文件夹
  img.file('Hello.txt', 'Hello World\n');
  zip.generateAsync({ type: 'blob' }).then(function (content) {
    // see FileSaver.js
    saveAs(content, 'example.zip'); // FileSaver.js 下载
  });
};
```

### 大文件下载

参考文章[文件下载，搞懂这 9 种场景就够了](https://juejin.cn/post/6989413354628448264#heading-17) 参考文章[大文件下载](https://mp.weixin.qq.com/s/E4SdYEkEzurfrnJrBu3bjA)
