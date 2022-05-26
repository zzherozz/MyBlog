import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Spin } from 'antd';
import style from './index.module.less';
const App: React.FC = () => {
  const [loding, setLoding] = useState(false);
  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  useEffect(() => {
    setLoding(true);
    form.setFieldsValue({ username: 'admin1', password: 'admin1' });
    console.log('数据：', form.getFieldsValue(true));
  }, []);
  useEffect(() => {
    setTimeout(() => {
      setLoding(false);
    }, 3000);
  }, []);
  return (
    <>
      {loding ? (
        <Spin />
      ) : (
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 8 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          initialValues={{ username: 'admin' }}
          form={form}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
            initialValue={'admin3'}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      )}
    </>
  );
};

export default App;
