import React from 'react';

interface demoProps {
  text?: string;
  children: React.ReactNode;
}
type NativeButtonProps = Partial<React.ButtonHTMLAttributes<HTMLButtonElement> & demoProps>;
// Partial将接口属性变成可选的
const Demo: React.FC<NativeButtonProps> = ({ text, children }) => {
  return <button>{children}</button>;
};
export default Demo;
