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

### list -> tree

```jsx | pure
export const getChildrenList = (data) => {
  const info = data.reduce((pre, node) => {
    return (pre[node.id] = node), (node.children = []), pre;
  }, {});
  const arr = data.filter((node) => {
    if (info[node.pid]) {
      info[node.pid].children.push(node);
    }
    return !node.pid;
  });
  return arr;
};
```
