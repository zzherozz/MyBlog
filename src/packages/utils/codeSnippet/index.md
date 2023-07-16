---
nav:
  path: /utils
---

# 常用代码片段

### 获取 obj 类型

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
export const arr2Tree = (data) => {
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

### 获取树型节点最大深度

```jsx | pure
export const getTreeHierarchy = (data) => {
  let maxLevel = 0;
  const getMaxLevel = (treeData, level) => {
    treeData.forEach((item) => {
      if (level > maxLevel) {
        maxLevel = level;
      }
      if (Array.isArray(item?.children) && item?.children?.length) {
        getMaxLevel(item?.children, level + 1);
      }
    });
  };
  getMaxLevel(data, 1);
  return maxLevel;
};
```

### 数据扁平化

```jsx | pure
export const treeToArray = (tree) => {
  return Array.isArray(tree)
    ? tree.reduce((res, item) => {
        const { children, ...i } = item;
        return res.concat(i, children && children.length ? treeToArray(children) : []);
      }, [])
    : [];
};
```

### 获取当前节点所在树中得层级

```jsx | pure
export const getCurrentNodeLevel = (TreeData, id) => {
  const list = treeToArray(TreeData);
  const info = list?.reduce((pre, node) => {
    pre[node.id] = node;
    node.children = [];
    return pre;
  }, {});
  let level = 0; // 根节点算第0层
  const getLevel = (info, id) => {
    if (info && info[id]?.parentDataId) {
      level = level + 1;
      getLevel(info, info[id]?.parentDataId);
    }
  };
  getLevel(info, id);
  return level;
};
```

### 获取父节点

```jsx | pure
export const getParentKey = (key, tree) => {
  let parentKey;
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    if (node.children) {
      if (node.children.some((item) => item.key === key)) {
        parentKey = node.key;
      } else if (getParentKey(key, node.children)) {
        parentKey = getParentKey(key, node.children);
      }
    }
  }
  return parentKey;
};
```
