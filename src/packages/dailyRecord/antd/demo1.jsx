import React, { useReducer, createContext } from 'react';
import { Select, Form, Button } from 'antd';

const { Option } = Select;

const opts = [
  { label: '选项一', value: 1, name: '选项一的文本' },
  { label: '选项二', value: 2, name: '选项的文本' },
];
const SelectDemo = () => {
  const [from] = Form.useForm();
  console.log(from, 'from');
  const handleChange = (value) => {
    console.log('数据：', value);
  };
  const handleOk = () => {
    const value = from.getFieldsValue();
    console.log('value', value);
  };
  return (
    <>
      <Form from={from}>
        <Form.Item name="name" label="数据收集">
          <Select style={{ width: 120 }} onSelect={handleChange} labelInValue>
            {opts.map((item, index) => (
              <Option value={item?.value} key={index}>
                {item?.label}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
      <Button onClick={handleOk}>确定</Button>
    </>
  );
};
export default SelectDemo;
