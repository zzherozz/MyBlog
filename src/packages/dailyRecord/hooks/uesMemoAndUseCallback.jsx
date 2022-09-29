import { useMemo, useCallback, useState } from 'react';

const TestDemo = () => {
  const [num, setNum] = useState(1);

  const handleNumClick = () => {
    setNum((num) => num + 1);
  };
  const demo1 = () => {
    console.log('memo:', num);
    return num;
  };
  const demo2 = () => {
    console.log('callBack:', num);
  };
  const handleClickMemo = useMemo(() => demo1(), [num]); //该回调函数在渲染的时候执行过一次
  const handleClickCallBack = useCallback(demo2, [num]);
  return (
    <div>
      <div onClick={handleNumClick}>{num}</div>
      <div>memo:{handleClickMemo}</div>
      <div>handleClickCallBack:{handleClickCallBack}</div>
    </div>
  );
};

export default TestDemo;
