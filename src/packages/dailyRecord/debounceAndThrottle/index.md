---
nav:
  title: Components
  path: /daily-record
---

## 防抖（debounce）与 节流（throttle）

节流与防抖的前提都是某个行为持续地触发，不同之处只要判断是要优化到减少它的执行次数（节流）还是只执行一次就行（防抖）。

### 防抖（debounce）：

举一个栗子：打王者游戏的时候，回城技能的实现就是一个很好的防抖例子，当你不断的点击回城的时候，但是实际没有触发回城的函数。但当你点击回城并等待一段那时间，回城才真的执行。工作中像搜索框这种，经常使用防抖。

非立即防抖：触发事件后函数不会立即执行，而是在 n 秒之后执行，如果 n 秒之内又触发了事件，则会重新计算函数执行时间。立即防抖：触发事件后函数会立即执行，然后 n 秒内不触发事件才会执行函数的效果

非立即防抖：

```jsx | pure
function debounce(func, wait) {
  const args = arguments;
  const context = this;
  let timer = null;
  return function () {
    if (timer) clearTimeout(timer);
    timer = setTimeOut(function () {
      func.apply(context, args);
    }, wait);
  };
}
```

立即防抖：

```jsx | pure
function debounce(func, wait) {
  const args = arguments;
  const context = this;
  let timer = null;
  return function () {
    if (timer) clearTimeOut(timer);
    let callNow = !timer;
    timer = setTimeOut(() => {
      timer = null;
    }, wait);
    if (callNow) func.apply(context, args);
  };
}
```

结合版本：

```jsx | pure
/**
 * @name: debounce 防抖函数 将一段时间内连续的多次触发转化为一次触发
 * @param {func} 需要防止抖动的函数
 * @param {wait} 期望函数执行间隔时间
 * @param {immediate} 是否马上执行
 */
const debounce = (func, wait, immediate = false) => {
  let timer, result;
  let debounced = function () {
    const args = arguments;
    if (timer) clearTimeOut(timer);
    if (immediate) {
      let callNow = !timer;
      timer = setTimeOut(() => {
        timer = null;
      }, wait);
      // 立即执行
      if (callNow) result = func.apply(this, args);
    } else {
      // 非立即执行
      timer = setTimeOut(() => {
        func.apply(this, args);
      }, wait);
    }
    return result;
  };
  debounced.cancel = function () {
    clearTimeout(timeout);
    timeout = null;
  };
  return debounced;
};
```
