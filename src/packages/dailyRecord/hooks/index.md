---
nav:
  title: Components
  path: /daily-record
---

## hooks 学习

### useState

### useState 两种使用方式

1.直接更新值

```jsx | pure
setState(newState);
```

2.函数式更新

```jsx | pure
setState((prevState) => {
  // 也可以使用 Object.assign
  return { ...prevState, ...updatedValues };
});
```

值得注意：与 class 组件中的 setState 方法不同，$\color{#FF0000}{useState 不会合并更新，只会全量更新。}$你可以用函数式的 setState 结合展开运算符来达到合并更新对象的效果。useReducer 是另一种可选方案，它更适合用于管理包含多个子值的 state 对象。

3.useState 的捕获问题

```jsx
import React from 'react';
import { FunButtonState, Counter } from './index.jsx';
export default () => (
  <>
    <FunButtonState />
    <Counter />
  </>
);
```

操作步骤:点击函数式组件,你会发现弹窗出来的 state 是 0,无论修改延时多长时间,alert 弹出的只会是 0,alert 会“捕获”我点击按钮时候的状态。<br> 解释：函数组件闭包机制，$\color{#FF0000}{函数组件每一次渲染都有独立的 props 和 state。}$ 每一次渲染都有独立的事件处理函数,每一次渲染的状态不会受到后面事件处理的影响。<br>

3.如何避免 useState 的捕获问题

```jsx
import React from 'react';
import { FunButtonRef } from './index.jsx';
export default () => (
  <>
    <FunButtonRef />
  </>
);
```

解决方案：$\color{#FF0000}{使用ref,useRef当中的值发生了变化但是不会触发组件的渲染}$。useRef 返回一个可变的 ref 对象，其 current 属性被初始化为传入的参数。返回的 ref 对象在组件的整个重新渲染过程持续存在。与 useState 的区别在于 useState 创建的对象，在每个重新渲染过程内都是独立的而 ueseRef 是共享的。

4.useState 的同步异步问题首先我们知道：在 class 类中的我们使用 this.setState 来做为我们的更新进行 state 更新，因为 react 的事件合成当中,this.setState 在原生事件里面是同步，但是在我们的合成事件当中是为异步，有时需要在更新后，我们需要拿到更新后的 state 值，会在 setState(state,cb)加上 callBack 方法用于处理立即更新后的一些处理。那么 useState 异步更新的时候，如何拿到新的值？

```jsx | pure
export const FunButton = () => {
  const [num, setNum] = useState([0]);
  const handleClick = () => {
    setNum([...num, 1]);
    setNum([...num, 2]); // 你会发现这里拿到的num还是0
  };
  return <button onClick={handleClick}>函数式组件({num})</button>;
};
```

```jsx
import React from 'react';
import { FunButton } from './index.jsx';
export default () => (
  <>
    <FunButton />
  </>
);
```

解决方案一：利用函数式更新拿到最新的 state

```jsx | pure
export const FunButton = () => {
  const [num, setNum] = useState([0]);
  const handleClick = () => {
    setNum([...num, 1]);
    setNum((preNum) => [...preNum, 2]); // 通过函数，拿到最新的state
  };
  return <button onClick={handleClick}>函数式组件({num})</button>;
};
```

解决方案二：自己封装 callback,使得在 callback 中能够获取新的值

```jsx | pure
export const useStateSetWitchRef = (initValue) => {
  const callbackRef = useRef(null);
  const [value, setValue] = useState(initValue);
  useEffect(() => {
    if (callbackRef.current) {
      callbackRef.current(value);
    } else {
      callbackRef.current = null;
    }
  }, [value]);
  const setNewValue = (newValue, callBack) => {
    callbackRef.current = callBack;
    return setValue(newValue);
  };
  return [value, setNewValue];
};
```

```jsx
import React from 'react';
import { FunButtonStateRef } from './index.jsx';
export default () => (
  <>
    <FunButtonStateRef />
  </>
);
```

### useEffect

#### 执行时机：

1.默认情况下，effect 将在每轮渲染结束后执行，但你可以选择让它在只有某些值改变的时候才执行。<br> 2.可以相当于 componentDidMount 和 componentDidUpdate<br> 3.useEffect 中 return 一个函数的时候，相当于 componentWillUnMount<br> 4.存在多个时，每个 useEffect 都会触发,useEffect 的执行顺序与它代码书写的顺序是一致的<br>
