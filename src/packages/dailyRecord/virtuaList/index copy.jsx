import React, { useRef, useState } from 'react';
import { useInfiniteScroll } from 'ahooks';

const resultData = [
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
];
function getLoadMoreList(page, pageSize) {
  console.log(page);
  const start = (page - 1) * pageSize;
  const end = page * pageSize;
  const list = resultData.slice(start, end);
  const nId = resultData.length >= end ? resultData[end] : undefined;
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        list,
        nextId: nId,
        total: resultData.length,
      });
    }, 1000);
  });
}
const PAGE_SIZE = 10;
const VirtuaList = (props) => {
  const { data, loading, loadMore, loadingMore, noMore } = useInfiniteScroll(
    (d) => {
      const page = d ? Math.ceil(d.list.length / PAGE_SIZE) + 1 : 1;
      return getLoadMoreList(page, PAGE_SIZE);
    },
    {
      target: ref,
      isNoMore: (d) => d?.nextId === undefined,
    },
  );
  const ref = useRef(null);
  return (
    <div ref={ref} style={{ height: 300, overflow: 'auto', border: '1px solid', padding: 12 }}>
      {loading ? (
        <p>loading</p>
      ) : (
        <div>
          {data?.list?.map((item) => (
            <div key={item} style={{ padding: 12, border: '1px solid #f5f5f5' }}>
              item-{item}
            </div>
          ))}
        </div>
      )}

      <div style={{ marginTop: 8 }}>
        {!noMore && (
          <button type="button" onClick={loadMore} disabled={loadingMore}>
            {loadingMore ? 'Loading more...' : 'Click to load more'}
          </button>
        )}

        {noMore && <span>No more data</span>}
      </div>
    </div>
  );
};

export default VirtuaList;
