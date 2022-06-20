---
nav:
  title: Components
  path: /daily-record
---

## antd 中 select 获取其他值

利用 select 的 labelInValue 属性,可以获得 select 中除去 value 的 label 字段,但是在实际开发中 label 字段远远不够，这时候我们可以在 onSelect 中利用 form 存储需要的字段。 Demo:

```tsx
import React from 'react';
import SelectDemo from './demo1.jsx';

export default () => <SelectDemo />;
```
