---
nav:
  title: leetCode习题册
  path: /leet-code
---

## 无重复字符串的最长字串

题目：给定一个字符串 s ，请你找出其中不含有重复字符的 最长子串 的长度。示例：

```javaScript
示例一:
输入: s = "abcabcbb"
输出: 3
解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
示例二:
输入: s = "bbbbb"
输出: 1
解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。
示例三:
输入: s = "pwwkew"
输出: 3
解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
     请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。

```

### 题解

思路:将字符串转化为数组，遍历数组，将已经遍历的 item 放在一个新数组里面，当遇见重复时候，将子串和长度放在 map 映射里面。在找到最大的长度。注意:1.遇见重复值，注意重复的位置，重复的 item 后面的都要生成新的字串 2.注意' '这种空串

```jsx | pure
const lengthOfLongestSubstring = function (s) {
  const strList = s.split('');
  const resMap = new Map();
  let tempList = [];
  strList.forEach((item, index) => {
    if (!tempList.includes(item)) {
      tempList.push(item);
      if (index === strList.length - 1) resMap.set(tempList.length, tempList.join(''));
    } else {
      resMap.set(tempList.length, tempList.join(''));
      const index = tempList.findIndex((x) => x === item);
      const list = tempList.splice(index + 1);
      tempList = [];
      tempList.push(...list);
      tempList.push(item);
    }
  });
  const arr = [...resMap.keys()];
  let max = 0;
  arr.length > 0 ? (max = Math.max(...arr)) : (max = s.length);
  return max;
};
```
