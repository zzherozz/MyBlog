---
nav:
  title: Components
  path: /js
---

### 文件的上传

![](./%E5%89%8D%E7%AB%AF%E4%B8%8A%E4%BC%A0.png)

主要参考文章：[文件上传，搞懂这 8 种场景就够了](https://juejin.cn/post/6980142557066067982#heading-15)[大文件分块上传](https://mp.weixin.qq.com/s/-iSpCMaLruerHv7717P0Wg)

```tsx
import React from 'react';
import { Demo1 } from './index.jsx';
export default () => <Demo1 />;
```

在实际开发中根据业务需求：antd 其实已经造好轮子了。<br> 在上传这一块，不管使用何种方式，都是先获取到文件对象然后在利用表单[FormData](https://developer.mozilla.org/zh-CN/docs/Web/API/FormData)对象进行传输。<br>

```jsx | pure
// 通过FormData构造函数创建一个空对象
const formdata = new FormData();
// 可以通过append()方法来追加数据
formdata.append('name', 'randy');
// 通过get方法对值进行读取
console.log(formdata.get('name')); //randy
// 通过set方法对值进行设置
formdata.set('name', 'demi');
console.log(formdata.get('name')); //demi
// 获取key为age的所有值，返回值为数组类型
formdata.getAll('age');
// 判断是否包含key为name的数据
console.log(formdata.has('name')); //true
// 删除key为name的值
formdata.delete('name');

// 遍历
formData.keys();
formData.values();
formData.entries();
```

```tsx
import React from 'react';
import { FileReaderDemo } from './index.jsx';
export default () => <FileReaderDemo />;
```

#### csv 文件上传 demo

```tsx
import React from 'react';
import { Demo2 } from './index.jsx';
export default () => <Demo2 />;
```
