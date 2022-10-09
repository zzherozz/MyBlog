import React, { useReducer, createContext } from 'react';
// 1. 创建全局的Context
const Context = createContext();

// 2. 创建全局的状态
const initState = {
  add: '展示内容哈哈哈',
  detail: {},
};
// 3. 使用reducer来更新状态
const setAdd = (state, payload) => ({
  ...state,
  add: payload,
});
const setDetail = (state, payload) => ({
  ...state,
  detail: payload,
});
const Actions = {
  ADD: 'add',
  DETAIL: 'detail',
};
const handlerMap = {
  [Actions.ADD]: setAdd,
  [Actions.DETAIL]: setDetail,
};
const reducer = (state, action) => {
  const { type, payload } = action;
  const handler = handlerMap[type];
  const res = typeof handler === 'function' && handler(state, payload);
  return res || state;
};
// 4.将全局的状态用Provider包裹起来

const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, { ...initState });
  const value = { state, dispatch };
  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export { Context, Provider, Actions };
