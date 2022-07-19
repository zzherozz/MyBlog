---
nav:
  title: Components
  path: /js
---

## Promise 学习笔记

定义：Promise 是一个对象，它代表了一个异步操作的最终完成或者失败。

### 使用 promise

优点 1： 指定回调函数的时机比较灵活,可以在异步操作完成之前或者之后指定回调函数，都不影响回调函数的调用。对比，纯回调函数处理异步，必须在异步操作之前指定回调函数。 demo1：

```jsx | pure
// 使用promise方式
const myPromise = new Promise((resolve, reject) => {
  // 模拟异步操作
  setTimeout(() => {
    resolve('成功的数据');
  }, 1000);
});
// 指定回调函数
myPromise.then(
  (value) => {},
  (reason) => {},
); // 指定成功的回调(onResolved)或者失败的回调(onRejected)

// 使用传统的纯回调方式处理
function successCallback(result) {
  console.log('Audio file ready at URL: ' + result);
}

function failureCallback(error) {
  console.error('Error generating audio file: ' + error);
}

createAudioFileAsync(audioSettings, successCallback, failureCallback);
```

有点二：常说的避免回调地狱问题（得益于 promise 对象的链式调用） demo2：

```jsx | pure
// 比如一个常见的需求获取数据A,通过A获取数据B,通过B返回的数据获取C这种依此嵌套问题

// 使用promise方式
doSomething()
  .then(function (result) {
    return doSomethingElse(result); // .then 可以返回一个新的promise从而形成另一个异步操作，这样的话，在 Promise上新增的回调函数会排在这个 Promise 对象的后面。
  })
  .then(function (newResult) {
    return doThirdThing(newResult);
  })
  .then(function (finalResult) {
    console.log('Got the final result: ' + finalResult);
  })
  .catch(failureCallback);

// 使用纯回调
doSomething(function (result) {
  doSomethingElse(
    result,
    function (newResult) {
      doThirdThing(
        newResult,
        function (finalResult) {
          console.log('Got the final result: ' + finalResult);
        },
        failureCallback,
      );
    },
    failureCallback,
  );
}, failureCallback);
```

ECMAScript 2017 标准的 async/await 语法糖中,这也是在实际开发中常用的方式

```jsx | pure
async function foo() {
  try {
    const result = await doSomething();
    const newResult = await doSomethingElse(result);
    const finalResult = await doThirdThing(newResult);
    console.log(`Got the final result: ${finalResult}`);
  } catch (error) {
    failureCallback(error);
  }
}
```

### Promise 的学习大纲：

![](./promise%E5%AD%A6%E4%B9%A0.png)
