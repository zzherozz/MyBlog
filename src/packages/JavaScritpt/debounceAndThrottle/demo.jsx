import { Input } from 'antd';
import React, { useMemo, useRef, useState } from 'react';

const Demo = () => {
  const [searchValue, setSearchValue] = useState();
  const inputRef = useRef(null);
  function debounce1(func, wait) {
    const args = arguments;
    const context = this;
    let timer = null;
    console.log('重置了debounce1：', timer);
    return function () {
      if (timer) clearTimeout(timer);
      console.log(timer, 'timer');
      timer = setTimeout(function () {
        func.apply(context, args);
      }, wait);
    };
  }
  function debounce2(func, wait) {
    const args = arguments;
    const context = this;
    let timer = null;
    console.log('重置了debounce2：', timer);
    return function () {
      if (timer) clearTimeout(timer);
      console.log(timer, 'timer');
      timer = setTimeout(function () {
        func.apply(context, args);
      }, wait);
    };
  }
  const onInputChange = () => {
    const value = inputRef?.current?.input?.value;
    setSearchValue(value);
    console.log(value, 'value');
  };
  const onDebounceInputChange1 = useMemo(() => debounce1(onInputChange, 2000), []);
  const onDebounceInputChange2 = debounce2(onInputChange, 1000);
  return (
    <>
      正常使用：
      <Input type="text" onChange={onDebounceInputChange1} ref={inputRef} />
      非正常使用：
      <Input type="text" onChange={onDebounceInputChange2} ref={inputRef} />
    </>
  );
};
export default Demo;
