---
nav:
  title: Components
  path: /js
---

## 防抖（debounce）与 节流（throttle）

节流与防抖的前提都是某个行为持续地触发，不同之处只要判断是要优化到减少它的执行次数（节流）还是只执行一次就行（防抖）。

### 防抖（debounce）：

举一个栗子：打王者游戏的时候，回城技能的实现就是一个很好的防抖例子，当你不断的点击回城的时候，但是实际没有触发回城的函数。但当你点击回城并等待一段那时间，回城才真的执行。工作中像搜索框这种，经常使用防抖。

非立即防抖：触发事件后函数不会立即执行，而是在 n 秒之后执行，如果 n 秒之内又触发了事件，则会重新计算函数执行时间。立即防抖：触发事件后函数会立即执行，然后 n 秒内不触发事件才会执行函数的效果

非立即防抖：

```jsx | pure
function debounce(func, wait) {
  const context = this;
  let timer = null;
  return function () {
    const args = arguments;
    if (timer) clearTimeout(timer);
    timer = setTimeout(function () {
      func.apply(context, args);
    }, wait);
  };
}
```

立即防抖：

```jsx | pure
function debounce(func, wait) {
  const context = this;
  let timer = null;
  return function () {
    const args = arguments;
    if (timer) clearTimeout(timer);
    let callNow = !timer;
    timer = setTimeout(() => {
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
    if (timer) clearTimeout(timer);
    if (immediate) {
      let callNow = !timer;
      timer = setTimeout(() => {
        timer = null;
      }, wait);
      // 立即执行
      if (callNow) result = func.apply(this, args);
    } else {
      // 非立即执行
      timer = setTimeout(() => {
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

### 节流（throttle）

举个栗子：比如一个持续流水的水龙头，水龙头开到最大的时候很浪费水资源，将水龙头开得小一点，让他每隔 200 毫秒流出一滴水，这样能源源不断的流出水而又不浪费。而节流就是每隔 n 的时间调用一次函数，而不是一触发事件就调用一次，这样就会减少资源浪费。像 dom 的拖拽或者滚动事件这种，就是常见的使用节流的栗子。

时间戳版： 时间戳版的函数触发是在时间段内开始的时候。定时器版本：定时器版的函数触发是在时间段内结束的时候。

时间戳版本：

```jsx | pure
function throttle(func, wait) {
  let temp = 0; // 这玩意存在闭包,所以只声明了一次。
  return function () {
    const now = Date.now();
    const context = this;
    const args = arguments;
    if (now - temp > wait) {
      func.apply(context, args);
      temp = now;
    }
  };
}
```

定时器版本：

```jsx | pure
function throttle(func, wait) {
  let timer = null;
  return function () {
    const args = arguments;
    const context = this;
    if (!timer) {
      timer = setTimeout(() => {
        func.apply(context, args);
        timer = null;
      }, wait);
    }
  };
}
```

结合版本：

```jsx | pure
/**
 * @name: throttle  节流函数 在规定的时间间隔，重复触发函数，只有一次是成功调用
 * @param {fun} 需要节流的函数
 * @param {delay} 期望多长时间内调用一次
 */
function throttle(func, wait) {
  let last, timer;
  return function (args) {
    const context = this;
    const now = Date.now();
    if (last && now < last + delay) {
      clearTimeout(timer);
      timer = setTimeout(function () {
        fun.call(context, args);
      }, delay);
    } else {
      last = now;
      fun.call(that, args);
    }
  };
}
```

题外话：防抖 hooks

```jsx | pure
// 防抖
export const useDebounce = (fn, delay, dep: any = []) => {
  useEffect(() => {
    let timer: any = null;
    timer = setTimeout(fn, delay);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...dep]);
};
```

题外话+1 ： 返回 promise 的防抖,Promise.race 的应用

```jsx | pure
const abortPromise = (promise) => {
  // 取消用的
  let abort;
  const errorPromise = new Promise((resolve, reject) => {
    abort = reject;
  });
  // 判断哪个完玩
  const p = Promise.race([promise, errorPromise]);
  p.abort = abort;
  return p;
};
export const debouncePromise = (fun, time) => {
  let promise;
  return function (...rest) {
    if (promise && typeof promise.abort === 'function') {
      promise.abort();
    }
    const timeoutPromise = new Promise((resolve) => {
      setTimeout(() => {
        resolve(undefined);
      }, time);
    });
    promise = abortPromise(timeoutPromise);
    return promise.then(
      () => {
        return fun(...rest);
      },
      () => {
        //   console.log('由于防抖中断了,而不是报错了');
        return Promise.resolve();
      },
    );
  };
};
```

### 实际工作

方式一：由于 hooks 重绘问题，会导致 timer 失效，每次都会重置。可以使用 useMemo 将函数缓存起来。（注意：这里防抖函数没使用缓存，看效果是生效，但实际打印会发现 timer 依然是不可靠的，这里会发现 debounce2 的 timer 一直在重置，这里就失去了我们使用闭包做防抖是意义）

```tsx
import React from 'react';
import Demo from './demo.jsx';
export default () => <Demo />;
```
