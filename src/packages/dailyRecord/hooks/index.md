---
nav:
  title: Components
  path: /daily-record
---

## hooks 学习

## useState

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

### useState 的捕获问题

```jsx
import React from 'react';
import { FunButtonState } from './buttonWithState.jsx';
export default () => (
  <>
    <FunButtonState />
  </>
);
```

操作步骤:点击函数式组件,你会发现弹窗出来的 state 是 0,无论修改延时多长时间,alert 弹出的只会是 0,alert 会“捕获”我点击按钮时候的状态。<br> 解释：函数组件闭包机制，$\color{#FF0000}{函数组件每一次渲染都有独立的 props 和 state。}$ 每一次渲染都有独立的事件处理函数,每一次渲染的状态不会受到后面事件处理的影响。<br>

### 如何避免 useState 的捕获问题

```jsx
import React from 'react';
import { FunButtonRef } from './buttonWithRef.jsx';
export default () => (
  <>
    <FunButtonRef />
  </>
);
```

解决方案：$\color{#FF0000}{使用ref,useRef当中的值发生了变化但是不会触发组件的渲染}$。useRef 返回一个可变的 ref 对象，其 current 属性被初始化为传入的参数。返回的 ref 对象在组件的整个重新渲染过程持续存在。与 useState 的区别在于 useState 创建的对象，在每个重新渲染过程内都是独立的而 ueseRef 是共享的。

### setState 的异步问题

之前写 this.setState 在原生事件中是同步的，在合成事件中是异步的。大部分时间接触的都是 react 合成事件。例如：onClick。（ps：据说 react18 更新之后 setState 都是异步的了）<br> 针对异步问题首先我们知道：在 class 类中的我们使用 this.setState 来做为我们的更新进行 state 更新，因为 react 的事件合成当中,this.setState 在原生事件里面是同步，但是在我们的合成事件当中是为异步，有时需要在更新后，我们需要拿到更新后的 state 值，会在 setState(state,cb)加上 callBack 方法用于处理立即更新后的一些处理。那么 useState 异步更新的时候，如何拿到新的值？

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

解决方案二：利用 useEffect 做监听

```jsx | pure
// 或是直接在hooks当中直接执行useEffect做监听
export const useStateWidthChange = (initState, callBack) => {
  const [state, setState] = useState(initState);
  useEffect(() => callBack(state), [state]);
  return [state, setState];
};
```

解决方案三：自己封装 callback,使得在 callback 中能够获取新的值

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

## useEffect

[useEffect 完整指南](https://overreacted.io/zh-hans/a-complete-guide-to-useeffect/)

### 执行时机

1.默认情况下，effect 将在每轮渲染结束后执行，但你可以选择让它在只有某些值改变的时候才执行。<br> 2.可以相当于(约等于) componentDidMount 和 componentDidUpdate<br> 3.useEffect 中 return 一个函数的时候，相当于 componentWillUnMount<br> 4.存在多个时，每个 useEffect 都会触发,useEffect 的执行顺序与它代码书写的顺序是一致的<br>

### 如何正确地在 useEffect 里请求数据？[]又是什么？

1.场景一：$\color{#FF0000}{如果某些函数仅在effect中调用，你可以把它们的定义移到effect中。}$这么做有什么好处呢？我们不再需要去考虑这些“间接依赖”。我们的依赖数组也不再撒谎：在我们的 effect 中确实没有再使用组件范围内的任何东西。

```jsx | pure
useEffect(() => {
  // We moved these functions inside!
  function getFetchUrl() {
    return 'https://hn.algolia.com/api/v1/search?query=react';
  }
  async function fetchData() {
    const result = await axios(getFetchUrl());
    setData(result.data);
  }

  fetchData();
}, []); // ✅ Deps are OK
```

2.场景二:存在 query 参数

```jsx | pure
useEffect(() => {
  function getFetchUrl() {
    return 'https://hn.algolia.com/api/v1/search?query=' + query;
  }

  async function fetchData() {
    const result = await axios(getFetchUrl());
    setData(result.data);
  }

  fetchData();
}, [query]); // ✅ Deps are OK
```

3.场景三：不能把这个函数放到 Effect 里的情况有时候你可能不想把函数移入 effect 里。比如，组件内有几个 effect 使用了相同的函数，你不想在每个 effect 里复制黏贴一遍这个逻辑。也或许这个函数是一个 prop。<br> 这个时候就会问，函数能不能成为 effect 的依赖？答案显而易见，是可以的。<br> $\color{#FF0000}{函数每次渲染都会改变这个事实本身就是个问题。}$

```jsx | pure
function SearchResults() {
  function getFetchUrl(query) {
    return 'https://hn.algolia.com/api/v1/search?query=' + query;
  }

  useEffect(() => {
    const url = getFetchUrl('react');
    // ... Fetch data and do something ...
  }, []); // 🔴 Missing dep: getFetchUrl

  useEffect(() => {
    const url = getFetchUrl('redux');
    // ... Fetch data and do something ...
  }, []); // 🔴 Missing dep: getFetchUrl

  // ...
}
```

在这个例子中，你可能不想把 getFetchUrl 移到 effects 中，因为你想复用逻辑。另一方面，如果你对依赖很“诚实”，你可能会掉到陷阱里。我们的两个 effects 都依赖 getFetchUrl，而它每次渲染都不同，所以我们的依赖数组会变得无用：一个可能的解决办法是把 getFetchUrl 从依赖中去掉。但是，我不认为这是好的解决方式。这会使我们后面对数据流的改变很难被发现从而忘记去处理。这会导致类似于上面“定时器不更新值”的问题。

```jsx | pure
function SearchResults() {
  // 🔴 Re-triggers all effects on every render
  function getFetchUrl(query) {
    return 'https://hn.algolia.com/api/v1/search?query=' + query;
  }

  useEffect(() => {
    const url = getFetchUrl('react');
    // ... Fetch data and do something ...
  }, [getFetchUrl]); // 🚧 Deps are correct but they change too often

  useEffect(() => {
    const url = getFetchUrl('redux');
    // ... Fetch data and do something ...
  }, [getFetchUrl]); // 🚧 Deps are correct but they change too often

  // ...
}
```

情况一，如果一个函数没有使用组件内的任何值，你应该把它提到组件外面去定义，然后就可以自由地在 effects 中使用：你不再需要把它设为依赖，因为它们不在渲染范围内，因此不会被数据流影响。它不可能突然意外地依赖于 props 或 state。

```jsx | pure
// ✅ Not affected by the data flow
function getFetchUrl(query) {
  return 'https://hn.algolia.com/api/v1/search?query=' + query;
}

function SearchResults() {
  useEffect(() => {
    const url = getFetchUrl('react');
    // ... Fetch data and do something ...
  }, []); // ✅ Deps are OK

  useEffect(() => {
    const url = getFetchUrl('redux');
    // ... Fetch data and do something ...
  }, []); // ✅ Deps are OK

  // ...
}
```

情况二： 你也可以把它包装成 useCallback Hook:useCallback 本质上是添加了一层依赖检查。它以另一种方式解决了问题 - $\color{#FF0000}{我们使函数本身只在需要的时候才改变，而不是去掉对函数的依赖。}$

```jsx | pure
function SearchResults() {
  const [query, setQuery] = useState('react');

  // ✅ Preserves identity until query changes
  const getFetchUrl = useCallback(() => {
    return 'https://hn.algolia.com/api/v1/search?query=' + query;
  }, [query]); // ✅ Callback deps are OK

  useEffect(() => {
    const url = getFetchUrl();
    // ... Fetch data and do something ...
  }, [getFetchUrl]); // ✅ Effect deps are OK

  // ...
}
```

### 如何在没有取消请求的情况，解决竞态问题

问题描述：我先请求 {id: 10}，然后更新到{id: 20}，但{id: 20}的请求更先返回。请求更早但返回更晚的情况会错误地覆盖状态值。这被叫做竞态。

```jsx | pure
function Article({ id }) {
  const [article, setArticle] = useState(null);

  useEffect(() => {
    let didCancel = false;

    async function fetchData() {
      const article = await API.fetchArticle(id);
      if (!didCancel) {
        setArticle(article);
      }
    }

    fetchData();

    return () => {
      didCancel = true;
    };
  }, [id]);

  // ...
}
```

### useEffect 执行条件

1.当数组里面的值是基础类型时,直接对比值是否相等。 2.当数组里面的值是引用类型时,直接引用值的地址是否相等。总结来看：react 比较 props 和 state 的时候使用的是全等比较。

```jsx
import React from 'react';
import TestUseEffectDemo from './useEffect.jsx';
export default () => (
  <>
    <TestUseEffectDemo />
  </>
);
```

## useRef

1.useRef 返回一个可变的 ref 对象，其 current 属性被初始化为传入的参数。<br> 2.useRef 当中的值发生了变化但是不会触发组件的渲染 <br> 3.与 useState 的区别在于 useState 创建的对象，在每个重新渲染过程内都是独立的而 useRef 是共享的,因此我们可以通过使用 useRef 拿到最新的值

## useMemo 和 useCallback

1.用于缓存函数，避免重复渲染,可以用于性能优化。<br> 2.useCallback 创建时（渲染页面）不去执行里面的函数,useMemo 创建时（渲染页面）会执行一次. 3.useCallback 需要配合 React.memo 才能达到优化效果

```jsx | pure
useCallback(cb, []); // 返回函数
useMemo(() => cb, []); // 返回结果
```

```jsx
import React from 'react';
import TestDemo from './uesMemoAndUseCallback.jsx';
export default () => (
  <>
    <TestDemo />
  </>
);
```

## useReducer 和 useContext 实现简易状态管理

思路:<br> 1.创建全局的 Context<br> 2.创建全局的 Reducer<br> 3.将全局 useReducer 返回的 state 和 dispatch 传递给全局 Context.Provider 的 value 中<br> 4.用全局构建好的带有 Context 的组件包裹应用根组件<br>

举个栗子：

```jsx
import React from 'react';
import Parent from './useContextAnduseReducer.jsx';
export default () => (
  <>
    <Parent />
  </>
);
```

## useImperativeHandle

useImperativeHandle 可以让父组件获取并执行子组件内某些自定义函数(方法)。本质上其实是子组件将自己内部的函数(方法)通过 useImperativeHandle 添加到父组件中 useRef 定义的对象中。<br> 注意：一般情况是不需要父组件执行子组件的方法的，一定要使用前，请想清楚。<br> 步骤：<br> 1、useRef 创建引用变量<br> 2、React.forwardRef 将引用变量分发给子组件<br> 3、useImperativeHandle 将子组件内定义的函数作为属性，添加到父组件中的 ref 对象上。<br>

父组件：

```jsx | pure
import React, { useRef } from 'react';
import ChildComponent from './childComponent';

function Imperative() {
  const childRef = useRef(null); //父组件定义一个对子组件的引用

  const clickHandle = () => {
    childRef.current.addCount(); //父组件调用子组件内部 addCount函数
  };

  return (
    <div>
      {/* 父组件通过给子组件添加 ref 属性，将childRef传递给子组件，
            子组件获得该引用即可将内部函数添加到childRef中 */}
      <ChildComponent ref={childRef} />
      <button onClick={clickHandle}>child component do somting</button>
    </div>
  );
}
export default Imperative;
```

子组件：

```jsx | pure
import React, { useState, useImperativeHandle } from 'react';

function ChildComponent(props, ref) {
  const [count, setCount] = useState(0); //子组件定义内部变量count
  //子组件定义内部函数 addCount
  const addCount = () => {
    setCount(count + 1);
  };
  //子组件通过useImperativeHandle函数，将addCount函数添加到父组件中的ref.current中
  useImperativeHandle(ref, () => ({ addCount }));
  return (
    <div>
      {count}
      <button onClick={addCount}>child</button>
    </div>
  );
}

//子组件导出时需要被React.forwardRef包裹，否则无法接收 ref这个参数
export default React.forwardRef(ChildComponent);
```
