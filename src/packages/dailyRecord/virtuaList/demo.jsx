import React, { useRef, useState, useEffect } from 'react';
import { isFunction, throttle } from 'lodash-es';
const resultData = [
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '19',
  '20',
  '21',
  '22',
];
const VirtuaList = () => {
  const [list, setList] = useState([]);
  const [pageConfig, setPageConfig] = useState({
    pageNo: 1,
    pageSize: 10,
  });
  const currentRef = useRef(null);
  useEffect(() => {
    currentRef.current = pageConfig;
  }, [pageConfig]);
  // 获取数据的函数
  const getMoreList = () => {
    const { pageNo, pageSize } = currentRef.current;
    // 事件监听这里：获取不到最新的pageConfig
    // const {pageNo, pageSize} = pageConfig; 这里通过状态获取的pageConfig,函数外拿到的pageConfig已经不是同一个东西了
    // 函数内的pageConfig在开始监听document.addEventListene的时候已经确定了。
    const start = (pageNo - 1) * pageSize;
    const end = pageNo * pageSize;
    const tempList = resultData.slice(start, end);
    if (pageNo <= Math.ceil(resultData?.length / pageSize)) {
      setPageConfig((pageConfig) => ({ ...pageConfig, pageNo: pageNo + 1 }));
      setList((prelist) => [...prelist, ...tempList]);
      // 新的State要通过当前的state计算得出,使用函数形式。错误方式setList(([...list, ...tempList])),这里的list是[]。
    }
  };
  // 判断是否触底
  const isScrollToBottom = (handler) => {
    const div = document.getElementById('scrollWrap');
    const scrollTop = div.scrollTop; // 滚动条高度
    const clientHeight = div.clientHeight; // 可视区域高度
    const scrollHeight = div.scrollHeight; // 总高度---滚动部分高度
    if (scrollTop + clientHeight >= scrollHeight) {
      isFunction(handler) && handler();
    }
  };
  //节流一波
  const fn = throttle(() => {
    isScrollToBottom(getMoreList);
  }, 500);
  useEffect(() => {
    getMoreList(pageConfig.pageNo, pageConfig.pageSize);
  }, []);

  useEffect(() => {
    // 开启侦听器,监听页面滚动
    document.getElementById('scrollWrap').addEventListener('scroll', fn);
    // 组件销毁时移除侦听器
    return () => {
      document.getElementById('scrollWrap').removeEventListener('scroll', fn);
    };
  }, []);

  return (
    <div
      style={{ height: 300, overflow: 'auto', border: '1px solid', padding: 12 }}
      id="scrollWrap"
    >
      {Array.isArray(list) &&
        list.map((item, index) => {
          return (
            <div key={index} style={{ padding: 12, border: '1px solid #f5f5f5' }}>
              这里是：{item}
            </div>
          );
        })}
    </div>
  );
};

export default VirtuaList;
