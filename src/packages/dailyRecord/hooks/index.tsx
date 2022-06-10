import React, { useReducer, createContext } from 'react';

type FatherProps = {
  name: String;
};
type childrenAgeProps = {
  age: Number;
};
type childrenSexProps = {
  sex: String;
};
export const ChildrenAge: React.FC<childrenAgeProps> = ({ age }) => {
  return <span>{age}</span>;
};
export const ChildrenSex: React.FC<childrenSexProps> = ({ sex }) => {
  return <span>{sex}</span>;
};

const Father: React.FC<FatherProps> = ({ name }) => {
  return (
    <div>
      <div>姓名：{name}</div>
      <div>
        年龄：
        <ChildrenAge age={19} />
      </div>
      <div>
        性别：
        <ChildrenSex sex="女" />
      </div>
    </div>
  );
};

export default Father;
