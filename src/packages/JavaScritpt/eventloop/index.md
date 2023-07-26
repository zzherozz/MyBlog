---
nav:
  title: Components
  path: /JavaScript
---

## JavaScript-浏览器 eventLoop 事件循环

Event Loop 即事件循环，是指浏览器或 Node 的一种解决 javaScript 单线程运行时不会阻塞的一种机制，也就是我们经常使用异步的原理。

### 宏队列和微队列

#### 宏队列，macrotask，也叫 tasks。 一些异步任务的回调会依次进入 macro task queue，等待后续被调用，这些异步任务包括：

setTimeout<br> setInterval<br> setImmediate (Node 独有)<br> requestAnimationFrame (浏览器独有)<br> I/O<br> UI rendering (浏览器独有)<br>

#### 微队列，microtask，也叫 jobs。 另一些异步任务的回调会依次进入 micro task queue，等待后续被调用，这些异步任务包括：

process.nextTick (Node 独有)<br> Promise<br> Object.observe<br> MutationObserver<br> （注：这里只针对浏览器和 NodeJS）<br> ![](./promise1.png) ![](./promise2.png)

1.执行全局 Script 同步代码，这些同步代码有一些是同步语句，有一些是异步语句（比如 setTimeout 等）,异步代码放进任务队列中；<br> 2.全局 Script 代码执行完毕后，调用栈 Stack 会清空；<br> 3.从微队列 microtask queue 中取出位于队首的回调任务，放入调用栈 Stack 中执行，执行完后 microtask queue 长度减 1；<br> 4.继续取出微队列位于队首的任务，放入调用栈 Stack 中执行，以此类推，直到直到把 microtask queue 中的所有任务都执行完毕。$\color{#FF0000}{注意，如果在执行microtask的过程中，又产生了microtask，那么会直接加入到队列的末尾，也会在这个周期被调用执行；}$ <br> 5.microtask queue 中的$\color{#FF0000}{所有任务}$都执行完毕，此时 microtask queue 为$\color{#FF0000}{空队列}$，调用栈 Stack 也为空；<br> 6.取出宏队列 macrotask queue 中位于队首的任务，放入 Stack 中执行；$\color{#FF0000}{宏队列macrotask一次只从队列中取一个任务执行，执行完后就去执行微任务队列中的任务；}$<br> 7.执行完毕后，调用栈 Stack 为空；重复第 3-7 个步骤；重复第 3-7 个步骤； ...... 可以看到，这就是浏览器的事件循环 Event Loop

举例：

```jsx | pure
console.log(1); // 首先打印1

setTimeout(() => {
  // 遇见宏任务，放进宏队列
  console.log(2); //第三轮：打印2，此时已经打印1,4,10,5,6,7, 2
  Promise.resolve().then(() => {
    console.log(3); // 紧接着执行微任务 打印3，此时已经打印1,4,10,5,6,7, 2,3
  });
});

new Promise((resolve, reject) => {
  console.log(4); //执行器里面的是同步代码,打印4; 此时打印1,4
  resolve(5);
}).then((data) => {
  // 异步微任务，放在微队列    // 第二轮：处理微队列
  console.log(data); // 打印5; 此时已经打印1,4,10,5

  Promise.resolve()
    .then(() => {
      // 微任务中又产生微任务,在本轮执行,打印6,7; 此时已经打印1,4,10,5,6,7,
      console.log(6);
    })
    .then(() => {
      console.log(7);

      setTimeout(() => {
        // 遇见宏任务，放进宏队列,此时宏队列中已经存在定时器2和定时器9 ，微任务执行完毕，执行下一个宏任务
        console.log(8); // 最后打印8 ，此时已经打印1,4,10,5,6,7, 2,3,9，8
      }, 0);
    });
});

setTimeout(() => {
  // 遇见宏任务，放进宏队列
  console.log(9); // 继续执行宏任务 打印9，此时已经打印1,4,10,5,6,7, 2,3,9
});

console.log(10); // 打印10;此时已经打印1,4,10

// 最后打印顺序：1,4,10,5,6,7,2,3,9,8

// 例子2

Promise.resolve()
  .then(() => {
    console.log('then1');
    Promise.resolve().then(() => {
      // then2 需要等待then的状态变成resolve之后才会进行微任务里面
      console.log('then1-1');
    });
  })
  .then(() => {
    console.log('then2'); // 第二个then由于上一个Promise状态还未定 , 不会压入微任务中
  });
console.log('out');

// 例子3
Promise.resolve()
  .then(() => {
    console.log(1);
    Promise.resolve()
      .then(() => {
        console.log(2); // 执行微服务1，输出2，返回3，将后续的then回调压入微服务队列
        return 3;
      })
      .then((data) => {
        console.log(data);
      });
  })
  .then(() => {
    console.log(4); // 执行完成后把5推入微任务,然后执行上一轮放进去的3
  })
  .then(() => {
    console.log(5); // 5执行完了，把6放入微任务当中
  })
  .then(() => {
    console.log(6);
  });
// 最终输出结果：124356

Promise.resolve()
  .then(() => {
    console.log(1);
    Promise.resolve()
      .then(() => {
        console.log(2);
        return Promise.resolve(3); // then里面返回了resolve的话，那接下来的then会落后两个微任务队列，即这里的console.log(5);和console.log(6);，然后才压入微任务队列
      })
      .then((data) => {
        console.log(data);
      });
  })
  .then(() => {
    console.log(4);
  })
  .then(() => {
    console.log(5);
  })
  .then(() => {
    console.log(6);
  })
  .then(() => {
    console.log(7);
  });
// 最终输出结果：1245637

new Promise((resolve, reject) => {
  console.log('1');
  resolve();
})
  .then(() => {
    console.log('2');
    new Promise((resolve, reject) => {
      console.log('3'); // 输出3后，第一个then回调里：内部第一个Promise状态变为resolved，注册 console.log("4")微任务；此时该宏任务未结束，继续执行到return，new了内部第二个Promise，执行同步代码console.log("6")，将该Promise状态改为resolved，将后续console.log("7")注册到微任务队列；注意，此时第一个then的状态未改变，所以不会注册第二个then回调console.log("9")到微任务队列里
      resolve();
    })
      .then(() => {
        console.log('4');
      })
      .then(() => {
        console.log('5');
      });
    return new Promise((resolve, reject) => {
      console.log('6');
      resolve();
    })
      .then(() => {
        console.log('7'); // 执行微任务，输出4，7，5，8，这时第一个return返回的Promise状态变为resolved，注册第二个then回调console.log("9")到微任务队列里，执行
      })
      .then(() => {
        console.log('8');
      });
  })
  .then(() => {
    console.log('9');
  });
// 最终输出顺序：123647589
```

以上很多笔记来源两篇文章：[一个大佬的笔记](https://he5050.github.io/) [带你彻底弄懂 Event Loop](https://segmentfault.com/a/1190000016278115)
