import React, { useRef, useState, useMemo } from 'react';
import { Select, Form, Input } from 'antd';
// import {debounce} from 'loadsh'
const SelectDemo = () => {
  const [searchValue, setSearchValue] = useState();
  const inputRef = useRef(null);
  // function throttle(func, wait) {
  //   let timer = null;
  //   console.log('执行了');
  //   return function () {
  //     console.log(timer, 'timer');
  //     const args = arguments;
  //     const context = this;
  //     if (!timer) {
  //       timer = setTimeout(() => {
  //         func.apply(context, args);
  //         timer = null;
  //       }, wait);
  //     }
  //   };
  // }
  function debounce(func, wait) {
    const args = arguments;
    const context = this;
    let timer = null;
    console.log('执行了', timer);
    return function () {
      if (timer) clearTimeout(timer);
      console.log(timer, 'timer');
      timer = setTimeout(function () {
        func.apply(context, args);
      }, wait);
    };
  }

  function throttle(func, wait) {
    let temp = 0; // 这玩意存在闭包,所以只声明了一次。
    console.log('执行了');
    return function () {
      console.log(temp, 'temp');
      const now = Date.now();
      const context = this;
      const args = arguments;
      if (now - temp > wait) {
        func.apply(context, args);
        temp = now;
      }
    };
  }
  const onInputChange = () => {
    const value = inputRef?.current?.input?.value;
    setSearchValue(value);
    console.log(value, 'value', inputRef);
  };
  // const onThrottleInputChange = debounce(onInputChange, 1000);
  const onThrottleInputChange = useMemo(() => debounce(onInputChange, 2000), []);
  return (
    <>
      <Input type="text" onChange={onThrottleInputChange} ref={inputRef} />
      <div>搜索的值：{searchValue}</div>
    </>
  );
};
export default SelectDemo;
