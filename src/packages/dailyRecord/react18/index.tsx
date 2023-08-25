import React from 'react';
interface IProps {
  content: string;
  children: React.ReactNode;
}
const Button: React.FC<IProps> = ({ children }) => {
  return <div>{children}</div>;
};

export default Button;
