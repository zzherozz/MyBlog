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
