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

### 手写 Promise

#### 手写 Promise 首先要明确几点：

1.Promise 的初始状态为是 pengding,接收一个执行器函数 excutor: (resolve,reject)=>{} <br> 2.执行了 resolve，Promise 状态会变成 fulfilled<br> 3.执行了 reject，Promise 状态会变成 rejected<br> 4.Promise 只以第一次改变状态为准，第一次成功就永久为 fulfilled，第一次失败就永远状态为 rejected<br> 5.Promise 中有 throw 的话，就相当于执行了 reject<br> 6.resolve 和 reject 的绑定 this 这是为了 resolve 和 reject 的 this 指向永远指向当前的 MyPromise 实例，防止随着函数执行环境的改变而改变<br>

#### 关于 Promise.then

1.then 接收两个回调，一个是成功回调(onResolved)，一个是失败回调(onRejected)<br> 2.当 Promise 状态,为 pending 缓存回调函数,为 resolved 异步执行成功回调,为 rejected 异步执行失败回调<br> 3.如 resolve 或 reject 在定时器里，则定时器结束后再执行 then<br> 4.then 支持链式调用，下一次 then 执行受上一次 then 返回值的影响<br> 5.then 方法本身会返回一个新的 Promise 对象,他的结果状态由 onResolved 或者 onRejected 执行的结果决定。<br> (1).抛出 error,变为 rejected,结果值为 error<br> (2).返回值不是 Promise,变为 resolved,结果值为返回值<br> (3).返回值是 Promise,由这个 Promise 的值决定新的 Promise 的结果（成功/失败）如果返回值是 promise 对象，返回值为成功，新 promise 就是成功;返回值为失败,新 promise 就是失败.

```jsx | pure
// 手写Promise es5
(function (window) {
  const PENGDING = 'pengding';
  const RESOLVED = 'resolved';
  const REJECTED = 'rejected';
  /**
   * Promise构造函数
   * @param {执行器函数} excutor(同步执行)
   */
  function Promise(excutor) {
    const self = this; // 存储promise实例的this
    self.status = PENGDING;
    self.data = undefined; // 用于存储结果数据的属性，初始值为undefined
    self.callbacks = []; // 用于保存.then回调函数
    // 将promise的状态改为成功,指定成功的value。
    function resolve(value) {
      if (self.status !== PENGDING) return;
      self.status = RESOLVED;
      self.data = value;
      if (self.callbacks.length) {
        // 放在异步队列里面执行。（这里只是模拟异步，实际的promise不是使用延时函数，延时函数是一个宏任务）
        setTimeout(() => {
          self.callbacks.forEach(({ onResolved }) => {
            onResolved(value);
          });
        }, 0);
      }
    }
    // 将promise的状态改为失败,指定成功的value。
    function reject(reason) {
      if (self.status !== PENGDING) return;
      self.status = REJECTED;
      self.data = reason;
      if (self.callbacks.length) {
        // 放在异步队列里面执行。（这里只是模拟异步，实际的promise不是使用延时函数，延时函数是一个宏任务）
        setTimeout(() => {
          self.callbacks.forEach(({ onResolved }) => {
            onResolved(reason);
          });
        }, 0);
      }
    }
    try {
      excutor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }
  Promise.prototype.then = function (onResolved, onRejected) {
    const self = this;
    return new Promise((resolve, reject) => {
      function handle(callback) {
        try {
          const result = callback(self.data);
          if (result instanceof Promise) {
            result.then(
              // 返回值是Promise,由这个Promise的值决定新的Promise的结果（成功/失败）如果返回值是 promise 对象，返回值为成功，新 promise 就是成功;返回值为失败,新 promise 就是失败.
              (value) => resolve(value),
              (reason) => reject(reason),
            );
          } else {
            resolve(result); //返回值不是Promise,变为resolved,结果值为返回值
          }
        } catch (error) {
          reject(error); //(1).抛出error,变为rejected,结果值为error
        }
      }
      if (self.status === RESOLVED) {
        setTimeout(() => {
          handle(onResolved);
        }, 0);
      } else if (self.status === REJECTED) {
        setTimeout(() => {
          handle(onRejected);
        }, 0);
      } else {
        self.callbacks.push(
          // 不是直接保存成功或者失败的回调。应该保存包含回调函数调用的函数，这样才能更新返回的promise的状态
          {
            onResolved(value) {
              handle(onResolved);
            },
            onRejected(reason) {
              handle(onRejected);
            },
          },
        );
      }
    });
  };
  window.Promise = Promise;
})(window);
```
