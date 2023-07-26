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
          self.callbacks.forEach(({ onRejected }) => {
            onRejected(reason);
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
    onRejected =
      typeof onRejected === 'function'
        ? onRejected
        : (reason) => {
            throw reason;
          }; // 失败向下传递
    onResolved = typeof onResolved === 'function' ? onResolved : (value) => value; // 失败向下传递
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
          handle(onResolved); // 成功的回调
        }, 0);
      } else if (self.status === REJECTED) {
        setTimeout(() => {
          handle(onRejected); // 失败的回调
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

  Promise.prototype.catch = function (onRejected) {
    return this.then(undefined, onRejected);
  };

  Promise.resolve = function (value) {
    return new Promise((resolve, reject) => {
      if (value instanceof Promise) {
        value.then(resolve, reject);
      } else {
        resolve(value);
      }
    });
  };
  Promise.race = function (promises) {
    return new Promise((resolve, reject) => {
      promises.forEach((p) => {
        p.then(resolve, reject);
      });
    });
  };
  Promise.all = function (promises) {
    return new Promise((resolve, reject) => {
      let promisesCount = 0;
      const arr = [];
      promises.forEach((p, index) => {
        p.then((value) => {
          promisesCount++;
          arr[index] = value;
          if (promisesCount === promises?.length) resolve(value); // 都成功
        }, reject);
      });
    });
  };

  window.Promise = Promise;
})(window);
