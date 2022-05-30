---
nav:
  title: leetCode习题册
  path: /leet-code
---

## 盛最多水的容器

### 解题思路：

    利用好双指针解题

### 解题

```jsx | pure
var maxArea = function (height) {
  let i = 0;
  let j = height.length - 1;
  let res = 0;
  Array.isArray(height) &&
    height.forEach(() => {
      res = Math.max(res, Math.min(height[i], height[j]) * (j - i));
      if (height[i] < height[j]) {
        ++i;
      } else {
        --j;
      }
    });
  return res;
};
```
