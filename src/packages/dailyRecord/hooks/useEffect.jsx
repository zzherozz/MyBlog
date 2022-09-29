import { useEffect, useState } from 'react';

const TestUseEffectDemo = () => {
  const [num, setNum] = useState(1);
  const [obj, setObj] = useState({ num: 1 });
  const [objNo, setObjobjNo] = useState({ num: 1 });
  useEffect(() => {
    console.log('useEffect发现更新:', num);
  }, [num]);
  useEffect(() => {
    console.log('useEffect发现更新:', obj);
  }, [obj]);
  useEffect(() => {
    console.log('useEffect发现更新不改变地址的引用值:', objNo);
  }, [objNo]);
  const handleNumClick = () => {
    setNum((num) => num + 1);
  };
  const handleObjClick = () => {
    setObj({ num: 2 });
  };
  const handleObjNoClick = () => {
    setObjobjNo(Object.assign(objNo, { num: 2 })); // 你会发现执行这一句的时候，react感知不到变化。dom也没有更新
  };
  return (
    <div>
      <div onClick={handleNumClick}>值类型{num}</div>
      <div onClick={handleObjClick}>引用值类型,改变引用地址{obj.num}</div>
      <div onClick={handleObjNoClick}>引用值类型,不改变引用地址{objNo.num}</div>
    </div>
  );
};

export default TestUseEffectDemo;
