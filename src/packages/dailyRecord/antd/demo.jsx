import { Form, Input, Table } from 'antd';
import React, { useEffect } from 'react';
// import {debounce} from 'loadsh'
import { debouncePromise } from './debouncePromise';
const { Item, useForm } = Form;
export const Demo1 = () => {
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({
      attributes: [
        {
          property: '33333333',
          attribute: '5555555555',
        },
        {
          property: '6666666666',
          attribute: '7777777777',
        },
      ],
    });
  }, []);
  const renderColumns = (add, remove) => {
    const columns = [
      {
        title: '名称',
        dataIndex: 'property',
        key: 'property',
        render: (text, record, index) => {
          return (
            <Item name={[record.name, 'property']}>
              <Input placeholder="支持中英文字符输入" autoComplete="off" />
            </Item>
          );
        },
      },
      {
        title: '描述',
        dataIndex: 'attribute',
        key: 'attribute',
        render: (text, record, index) => {
          return (
            <Item name={[record.name, 'attribute']}>
              <Input placeholder="支持中英文字符输入" />
            </Item>
          );
        },
      },
      {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        render: (text, record, index) => {
          return (
            <div style={{ display: 'flex' }}>
              <div onClick={() => add()}>添加</div>
              <div onClick={() => remove(record.name)}>删除</div>
            </div>
          );
        },
      },
    ];
    return columns;
  };

  return (
    <Form form={form}>
      <Form.List name="attributes">
        {(fields, { add, remove }) => (
          <>
            <Table
              columns={renderColumns(add, remove)}
              pagination={false}
              dataSource={fields}
              // rowKey={record=>record?.property}
            ></Table>
          </>
        )}
      </Form.List>
    </Form>
  );
};
export const Demo2 = () => {
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({
      attributes: [
        {
          property: '3333333333',
          attribute: '555555555555',
        },
        {
          property: '3333',
          attribute: '77777777',
        },
      ],
    });
  }, []);
  const columns = [
    {
      title: '名称',
      dataIndex: 'property',
      key: 'property',
      render: (text, record, index) => {
        if (!record.isChildren) {
          return (
            <Item name={[index, 'property']}>
              <Input placeholder="支持中英文字符输入" autoComplete="off" />
            </Item>
          );
        } else {
          return (
            <Item name={[record.preIndex, 'children', index, 'property']}>
              <Input placeholder="支持中英文字符输入" autoComplete="off" />
            </Item>
          );
        }
      },
    },
    {
      title: '描述',
      dataIndex: 'attribute',
      key: 'attribute',
      render: (text, record, index) => {
        if (!record.isChildren) {
          return (
            <Item name={[index, 'attribute']}>
              <Input placeholder="支持中英文字符输入" autoComplete="off" />
            </Item>
          );
        } else {
          return (
            <Item name={[record.preIndex, 'children', index, 'attribute']}>
              <Input placeholder="支持中英文字符输入" autoComplete="off" />
            </Item>
          );
        }
      },
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      render: (text, record, index) => {
        const preIndex = record?.preIndex ?? index;
        return (
          <Form.List name={[preIndex, 'children']} noStyle>
            {(fields, { add, remove }) => (
              <>
                <div style={{ display: 'flex' }}>
                  <div
                    onClick={() => {
                      console.log(preIndex, index, '<<<<<');
                      if (!index && index !== 0) return;
                      add({ isChildren: true, preIndex: preIndex }, index + 1);
                    }}
                  >
                    添加
                  </div>
                  <div onClick={() => remove(index)}>删除</div>
                </div>
              </>
            )}
          </Form.List>
        );
      },
    },
  ];
  return (
    <Form form={form}>
      <Item shouldUpdate noStyle>
        {({ getFieldValue }) => {
          const data = getFieldValue('attributes');
          console.log(data, 'data');
          return (
            <Form.List name="attributes">
              {(fields, { add, remove }) => (
                <>
                  <Table
                    columns={columns}
                    pagination={false}
                    dataSource={data}
                    // rowKey={record=>record?.property}
                  ></Table>
                </>
              )}
            </Form.List>
          );
        }}
      </Item>
    </Form>
  );
};

export const Demo3 = () => {
  // 名称校验
  const validatorNameFun = (rule, value, callback) => {
    console.log(value);
    if (value === undefined) return Promise.resolve();
    try {
      const rst = false; // 这里就可以发送请求
      return rst ? Promise.resolve() : Promise.reject(new Error('名称重复，请更换!'));
    } catch (err) {
      callback();
      message.error(err?.message);
    }
  };
  const debounceValidator = debouncePromise(validatorNameFun, 500);
  return (
    <Form>
      <Item
        name="name"
        label="名称"
        required
        rules={[
          { required: true, message: '请输入名称' },
          {
            validateTrigger: 'onChange',
            message: '名称不允许重复',
            validator: debounceValidator,
          },
          { max: 50, message: '支持中英文字符输入，最长限制50个字符' },
        ]}
      >
        <Input
          style={{ maxWidth: '430px', marginLeft: '12px' }}
          placeholder="支持中英文字符输入，最长限制50个字符"
          autoComplete="off"
        />
      </Item>
    </Form>
  );
};
