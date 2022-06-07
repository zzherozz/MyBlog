---
nav:
  path: /utils
---

# 常用代码片段

## 获取 obj 类型

```jsx | pure
function typeOf(obj) {
  const map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object',
    '[object FormData]': 'formData',
  };
  return map[Object.prototype.toString.call(obj)];
}
```