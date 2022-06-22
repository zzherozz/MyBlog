import React, { useReducer, useState } from 'react';
import { Select, Form, Input } from 'antd';
const { Option } = Select;

const opts = [
  { label: '选项一', value: 1, name: '选项一的文本' },
  { label: '选项二', value: 2, name: '选项的文本' },
];
const SelectDemo = () => {
  const [form] = Form.useForm();
  const [searchValue, setSearchValue] = useState();
  const handleOk = () => {
    const value = form.getFieldsValue(true);
    console.log('value', value);
  };
  const handleUserNameChange = (value) => {
    const otherName = Array.isArray(opts) && opts.filter((i) => i.value === value)[0]?.name;
    otherName && form.setFields([{ name: 'otherName', value: otherName }]);
  };
  function throttle(func, wait) {
    let timer = null;
    return function () {
      console.log(timer, 'timer');
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

  // function throttle(func, wait) {
  //   let temp = 0; // 这玩意存在闭包,所以只声明了一次。
  //   return function () {
  //     console.log(temp,'temp');
  //     const now = Date.now();
  //     const context = this;
  //     const args = arguments;
  //     if (now - temp > wait) {
  //       func.apply(context, args);
  //       temp = now;
  //     }
  //   };
  // }
  const myPromise = new Promise((resolve, reject) => {
    // 模拟异步操作
    setTimeout(() => {
      resolve('成功的数据');
    }, 1000);
  });
  myPromise.finally((value) => {
    console.log(value, '3333');
  });
  myPromise.finally((value) => {
    console.log(value, '33344443');
  });
  const onInputChange = (e) => {
    e.persist();
    const value = e?.target?.value;
    setSearchValue(value);
    console.log(value, 'value', e);
  };
  const onThrottleInputChange = throttle(onInputChange, 2000, { leading: true });
  return (
    <>
      <Form form={form}>
        <Form.Item name="name" label="数据收集方式一">
          <Select style={{ width: 120 }} labelInValue>
            {opts.map((item, index) => (
              <Option value={item?.value} key={index}>
                {item?.label}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="userName" label="数据收集方式二">
          <Select style={{ width: 120 }} onSelect={handleUserNameChange}>
            {opts.map((item, index) => (
              <Option value={item?.value} key={index}>
                {item?.label}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
      <Input type="text" onChange={onThrottleInputChange} />
      <div>搜索的数据：{searchValue}</div>
    </>
  );
};
export default SelectDemo;
