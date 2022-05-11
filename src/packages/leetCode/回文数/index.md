---
nav:
  title: leetCode习题册
  path: /leet-code
---

## 回文数

给你一个整数 x ，如果 x 是一个回文整数，返回 true ；否则，返回 false 。回文数是指正序（从左向右）和倒序（从右向左）读都是一样的整数。例如，121 是回文，而 123 不是。

## 示例一

```javaScript
输入：x = -121
输出：false
解释：从左向右读, 为 -121 。 从右向左读, 为 121- 。因此它不是一个回文数。
```

## 解题

思路：将数字转化为字符串，字符串转化数组，反转，在转化为字符串对比

```jsx | pure
/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function (x) {
  return String(x) === String(x).split('').reverse().join('');
};
```
