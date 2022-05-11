---
nav:
  title: leetCode习题册
  path: /leet-code
---

## 两数相加

## 解题思路

1.将链表转化为数组，反转，转化数字类型相加。 2.得到结果，转化为数组，再转化为链表

```jsx | pure
/**
 * @param {Array} arr
 * @param {Number} type 0单链 1循环链
 * @return {ListNode}
 */
function array2List(arr, type = 0) {
  if (!arr.length) return null;
  let header = { index: 0, data: arr[0], next: null };
  let obj = header;
  for (let i = 1; i < arr.length; i++) {
    obj.next = { index: i, data: arr[i], next: null };
    obj = obj.next;
  }
  if (type) obj.next = header;
  return header;
}
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
const addTwoNumbers = function (l1, l2) {
  const l1List = Array.from(l1).reverse().join('');
  const l2List = Array.from(l2).reverse().join('');
  const restemp = Number(l1List) + Number(l2List);
  const res = String(restemp).split('').reverse().map(Number);
  console.log(array2List(res), res);
  return array2List(res, 0);
};
```
