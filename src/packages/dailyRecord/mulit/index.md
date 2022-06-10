---
nav:
  title: Components
  path: /daily-record
---

## 多语言自定义 hooks

### 常用类数组转换

```jsx | pure
/**
 *
 * @param {*} list [{ label: 'APPLICATION', value: '01' }]
 * @param {*} key 指定转化多语言的key
 * @returns 转化为正常list [{ label: '应用', value: '01' }]
 */
export const useMultilingualMappingList = (list, key = 'label') => {
  const { formatMessage } = useIntl();
  const tempList = useMemo(() => {
    Array.isArray(list) && list.map((item) => (item[key] = formatMessage({ id: item[key] })));
    return list;
  }, [list, formatMessage, key]);
  return tempList ?? [];
};
```

### 常用对象映射转化

```jsx | pure
export const isObject = (obj) => {
  return Object.prototype.toString.call(obj) === '[object Object]';
};

/**
 *
 * @param {*} obj {'01':'APPLICATION'} 映射转化
 * @returns  {'01':'应用'}
 */
export const useMultilingualObjMapping = (obj) => {
  const { formatMessage } = useIntl();
  const tempObj = useMemo(() => {
    if (isObject(obj)) {
      for (const key in obj) {
        if (Object.hasOwnProperty.call(obj, key)) {
          obj[key] = formatMessage({ id: obj[key] });
        }
      }
    }
    return obj;
  }, [obj, formatMessage]);
  return tempObj ?? {};
};
```
