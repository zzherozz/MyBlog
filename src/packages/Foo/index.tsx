import { SearchOutlined, DownOutlined } from '@ant-design/icons';
import classnames from 'classnames';
import styles from './index.module.less';
import { Tree, Input } from 'antd';
import { useState, useEffect } from 'react';
import { isFunction } from 'lodash-es';

// 获取父节点
const getParentKey = (key, tree) => {
  let parentKey;
  for (let i = 0; i < tree?.length; i++) {
    const node = tree[i];
    if (node.children) {
      if (node.children.some((item) => item.key === key)) {
        parentKey = node.key;
      } else if (getParentKey(key, node.children)) {
        parentKey = getParentKey(key, node.children);
      }
    }
  }
  return parentKey;
};
const GroupTree = (props) => {
  const { selectedKeys, treeData, onGroupTreeSelect, dataList } = props;
  const [showSearch, setShowSearch] = useState(false); // 是否展示搜索按钮
  const [expandedKeys, setExpandedKeys] = useState([]); // （受控）展开指定的树节点
  const [autoExpandParent, setAutoExpandParent] = useState(true); // 是否默认展开父节点
  const [searchValue, setSearchValue] = useState(''); // 搜索的value

  //选中子节点自动展开父节点
  useEffect(() => {
    const selectedKey = selectedKeys?.toString() || '';
    const currentExpandedKeys = getParentKey(selectedKey, treeData);
    if (currentExpandedKeys) setExpandedKeys([currentExpandedKeys]);
    setAutoExpandParent(true);
  }, [selectedKeys]);
  //搜索自动展开父节点
  const onIputChange = (e) => {
    const value = e?.target?.value || '';
    let expandedKeys = dataList
      ?.map((item) => {
        if (item.title.indexOf(value) > -1) {
          return getParentKey(item.key, treeData);
        }
        return null;
      })
      ?.filter((item, i, self) => item && self.indexOf(item) === i);
    if (value === '') expandedKeys = []; // 如果搜索是空串,就关闭所有的父节点
    setExpandedKeys(expandedKeys);
    setAutoExpandParent(true);
    setSearchValue(value);
  };
  // 受控父节点展开或收起
  const onExpand = (expandedKeys) => {
    setExpandedKeys(expandedKeys);
    setAutoExpandParent(false);
  };
  const loop = (data) =>
    data?.map((item) => {
      const index = item.title.indexOf(searchValue);
      const beforeStr = item.title.substring(0, index);
      const afterStr = item.title.slice(index + searchValue?.length);
      const title =
        index > -1 ? (
          <span>
            {beforeStr}
            <span className={styles.search_value}>{searchValue}</span>
            {afterStr}
          </span>
        ) : (
          <span>{item.title}</span>
        );
      if (item.children) {
        return { title, key: item.key, children: loop(item.children) };
      }
      return {
        title,
        key: item.key,
      };
    });

  const onGroupTreeSelectTree = (selectedKeys, e) => {
    onGroupTreeSelect(selectedKeys, e);
    setAutoExpandParent(false);
  };
  return (
    <div className={styles.left}>
      <div className={styles.title}>
        <div></div>
        {showSearch ? (
          <Input
            onChange={onIputChange}
            allowClear={{
              clearIcon: (
                <i
                  className="iconfont-type iconerror"
                  onClick={() => {
                    setShowSearch(false);
                  }}
                ></i>
              ),
            }}
            prefix={<SearchOutlined style={{ fontSize: '12px', color: '#67717A' }} />}
          />
        ) : (
          <SearchOutlined style={{ fontSize: '12px' }} onClick={() => setShowSearch(true)} />
        )}
      </div>
      <div className={styles.tree}>
        <Tree
          treeData={loop(treeData)}
          showIcon
          switcherIcon={<DownOutlined />}
          expandedKeys={expandedKeys}
          autoExpandParent={autoExpandParent}
          onExpand={onExpand}
          onSelect={isFunction(onGroupTreeSelect) && onGroupTreeSelectTree}
          selectedKeys={selectedKeys}
        />
      </div>
    </div>
  );
};

export default GroupTree;
