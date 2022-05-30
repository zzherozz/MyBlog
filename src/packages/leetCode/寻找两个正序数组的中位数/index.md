---
nav:
  title: leetCode习题册
  path: /leet-code
---

## 寻找两个正序数组的中位数

给定两个大小分别为 m 和 n 的正序（从小到大）数组 nums1 和 nums2。请你找出并返回这两个正序数组的 中位数 。算法的时间复杂度应该为 O(log (m+n)) 。

### 示例 1：

```javaScript
输入：nums1 = [1,3], nums2 = [2]
输出：2.00000
解释：合并数组 = [1,2,3] ，中位数 2
```

### 示例 2：

```javaScript
输入：nums1 = [1,2], nums2 = [3,4]
输出：2.50000
解释：合并数组 = [1,2,3,4] ，中位数 (2 + 3) / 2 = 2.5
```

### 题解

```jsx | pure
// @lc code=start
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function (nums1, nums2) {
  let resNums = [...nums1, ...nums2];
  resNums.sort((a, b) => a - b);
  if (resNums.length % 2 === 0) {
    return (resNums[resNums.length / 2] + resNums[resNums.length / 2 - 1]) / 2;
  } else {
    return resNums[(resNums.length - 1) / 2];
  }
};
```
