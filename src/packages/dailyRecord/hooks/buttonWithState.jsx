import React, { useState, useRef, useEffect } from 'react';

export const FunButtonState = () => {
  const [num, setNum] = useState(0);
  const handleClick = () => {
    setNum(num + 1);
    setTimeout(() => {
      alert('state的值' + num);
    }, 3000);
  };
  return <button onClick={handleClick}>函数式组件({num})</button>;
};
