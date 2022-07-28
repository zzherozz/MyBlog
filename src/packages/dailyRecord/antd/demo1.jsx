import { Form, Input, Table } from 'antd';
import React, { useEffect } from 'react';
// import {debounce} from 'loadsh'
const { Item, useForm } = Form;

const SelectDemo = () => {
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({
      attributes: [
        {
          property: '授权状态1',
          attribute: '联系方式当前授权状态2',
        },
        {
          property: '授权状态3',
          attribute: '联系方式当前授权状态3',
        },
      ],
    });
  }, []);

  const renderColumns = (fields, add, remove) => {
    const columns = [
      {
        title: '属性',
        dataIndex: 'property',
        key: 'property',
        render: (text, record, index) => {
          console.log(text, record, index, '3333');
          // return (
          //   <Item name={[index, 'property']}>
          //     <Input placeholder="支持中英文字符输入" autoComplete="off" />
          //   </Item>
          // );
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
        title: '数据映射',
        dataIndex: 'attribute',
        key: 'attribute',
        render: (text, record, index) => {
          console.log(text, record, index, '3333');
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
          return (
            <Form.List name={[index, 'children']} noStyle>
              {(fieldItems, { add, remove }) => (
                <div onClick={() => add({ isChildren: true, preIndex: index })}>添加</div>
              )}
            </Form.List>
          );

          // return <div onClick={()=>{
          //   form.setFields([{
          //     name:['attributes',index,'children'],
          //     value:[{isChildren:true}]
          //   }])
          // }}>添加</div>;
        },
      },
    ];
    return columns;
  };
  return (
    <Form form={form}>
      {/* <Item name='attributes'></Item> */}
      <Form.List name="attributes">
        {(fields, { add, remove }) => (
          <Item noStyle shouldUpdate>
            {({ getFieldValue }) => {
              const data = getFieldValue('attributes');
              console.log(data, 'data');
              return <Table dataSource={data} columns={renderColumns()}></Table>;
            }}
          </Item>
        )}
      </Form.List>
    </Form>
  );
};
// lalll
export default SelectDemo;
