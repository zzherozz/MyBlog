import React, { useState, useRef, useEffect } from 'react';
export const Counter = () => {
  const [count, setCount] = useState(0);
  function handleAlertClick() {
    setTimeout(() => {
      alert('You clicked on: ' + count);
    }, 3000);
  }
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
      <button onClick={handleAlertClick}>Show alert</button>
    </div>
  );
};
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

export const FunButton = () => {
  const [num, setNum] = useState([0]);
  const handleClick = () => {
    setNum([...num, 1]);
    setNum([...num, 2]);
  };
  return <button onClick={handleClick}>函数式组件({num})</button>;
};

export const useStateSetWitchRef = (initValue) => {
  const callbackRef = useRef(null);
  const [value, setValue] = useState(initValue);
  useEffect(() => {
    if (callbackRef.current) {
      callbackRef.current(value);
    } else {
      callbackRef.current = null;
    }
  }, [value]);
  const setNewValue = (newValue, callBack) => {
    callbackRef.current = callBack;
    return setValue(newValue);
  };
  return [value, setNewValue];
};

export const FunButtonStateRef = () => {
  const [num, setNum] = useStateSetWitchRef(0);
  const handleClick = () => {
    setNum(num + 1, (num) => {
      console.log('num', num);
    });
  };
  return <button onClick={handleClick}>函数式组件({num})</button>;
};
