---
nav:
  title: leetCode习题册
  path: /leet-code
---

## 最长回文子串

给你一个字符串 s，找到 s 中最长的回文子串。

### 示例 1：

```javaScript
输入：s = "babad"
输出："bab"
解释："aba" 同样是符合题意的答案。
```

### 示例 2：

```javaScript
输入：s = "cbbd"
输出："bb"
```

### 题解：

思路：暴解法，使用两个 for 循环查看每一段字符串是不是回文数，注意边界，length+1

```jsx | pure
var longestPalindrome = function(s) {
    const resMap = new Map()
    for (let index = 0; index < s.length; index++) {
        for (let j = 1; j < s.length+1; j++) {
            const tempStr = s.slice(index,j)
            const a = String(tempStr.split('').reverse().join(''))
            if(tempStr===a){
                resMap.set(tempStr.length,tempStr)
            }
        }
    }
    const keyList =Array.from(resMap.keys())
    const key = Math.max(...keyList)
    return resMap.get(key)
};"
```
