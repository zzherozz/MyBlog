import { useContext } from 'react';
import { Context, Provider, Actions } from './store/context';
const Children1 = () => {
  const { dispatch, state } = useContext(Context);
  const handleChangeAdd = () => {
    dispatch({
      type: Actions.ADD,
      payload: '更新拉！！！！！！！！！！',
    });
  };
  return <div onClick={handleChangeAdd}>点击这里:{state?.add}</div>;
};
const Children2 = () => {
  const { dispatch, state } = useContext(Context);
  return <div>{state?.add}</div>;
};
const Parent = () => {
  return (
    <Provider>
      <Children1></Children1>
      <Children2></Children2>
    </Provider>
  );
};

export default Parent;
