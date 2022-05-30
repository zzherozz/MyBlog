---
nav:
  title: leetCode习题册
  path: /leet-code
---

## 两数之和

给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 target 的那 两个 整数，并返回它们的数组下标。你可以假设每种输入只会对应一个答案。但是，数组中同一个元素在答案里不能重复出现。你可以按任意顺序返回答案

### 示例 1

```javaScript
输入：nums = [2,7,11,15], target = 9
输出：[0,1]
解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1]
```

### 解题一

```jsx | pure
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
const twoSum1 = function (nums, target) {
  const arr = [];
  nums.map((item, index) => {
    if (arr.length === 2) return;
    const tagetNum = target - item;
    const index2 = nums.findIndex((x) => x === tagetNum);
    if (index2 !== index && index2 > -1) {
      arr.push(index);
      arr.push(index2);
      return arr;
    }
  });
  return arr;
};
```

### 解题二

使用 ES6 中 Map，建立映射，数组的值为键，index 为值

```jsx | pure
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
const twoSum = function (nums, target) {
  let map = new Map();
  let arr = [];
  nums.forEach((item, index) => {
    let targetNum = target - item;
    if (map.has(targetNum) && map.get(targetNum) !== index) {
      arr = [map.get(targetNum), index];
    }
    map.set(item, index);
  });
  return arr;
};
```
