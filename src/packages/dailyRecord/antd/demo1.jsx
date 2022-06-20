import React, { useReducer, createContext } from 'react';
import { Select, Form, Button } from 'antd';

const { Option } = Select;

const opts = [
  { label: '选项一', value: 1, name: '选项一的文本' },
  { label: '选项二', value: 2, name: '选项的文本' },
];
const SelectDemo = () => {
  const [form] = Form.useForm();
  const handleOk = () => {
    const value = form.getFieldsValue(true);
    console.log('value', value);
  };
  const handleUserNameChange = (value) => {
    const otherName = Array.isArray(opts) && opts.filter((i) => i.value === value)[0]?.name;
    otherName && form.setFields([{ name: 'otherName', value: otherName }]);
  };
  return (
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
  );
};
export default SelectDemo;
