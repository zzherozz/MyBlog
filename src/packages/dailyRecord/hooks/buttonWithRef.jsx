import React, { useState, useRef, useEffect } from 'react';

export const FunButtonRef = () => {
  const [num, setNum] = useState(0);
  const firstRef = useRef(0);
  const handleClick = () => {
    setNum(num + 1);
    firstRef.current++;
    setTimeout(() => {
      alert('ref的值' + firstRef.current);
    }, 3000);
  };
  return <button onClick={handleClick}>函数式组件({num})</button>;
};
