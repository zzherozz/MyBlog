---
nav:
  title: Components
  path: /daily-record
---

## 触底加载 list 使用 ahooks

### 地址https://ahooks.js.org/zh-CN/

Demo:

```tsx
import React from 'react';
import { VirtuaList } from 'myblog';

export default () => <VirtuaList name="First Demo" />;
```

## 手写触底加载 demo

### 思路(伪代码一波)

1.使用 api 分别获取以下高度

```js
滚动高度（document.documentElement.scrollTop）
可视区域/屏幕高度（document.documentElement.clientHeight）
页面高度（document.documentElement.scrollHeight）
```

2.条件判断：

```js
If(滚动高度 + 可视区域  >= 页面高度){ do something 函数}
```

Demo:

```tsx
import React from 'react';
import VirtuaList from './demo.jsx';

export default () => <VirtuaList name="First Demo" />;
```
