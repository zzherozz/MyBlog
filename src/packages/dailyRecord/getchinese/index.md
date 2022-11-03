---
nav:
  title: Components
  path: /daily-record
---

## 多语言工作

### 获取项目中中文文字脚本

步骤：<br> 1.使用 extactText.js 文件放置在项目根目录中<br> 2.配置忽略文件路径<br> 3.使用 node 配置脚本<br> 4.输出 csv 文件<br>

```js | pure
// extactText.js
const glob = require('glob');
const fs = require('fs');
const { basename, resolve } = require('path');

const INPUT_PATTERN = './src/!(@types|icons|assets|services|utils)/**/*.+(js|jsx)'; // 排除那些文件
const filesPaths = glob.sync(INPUT_PATTERN);
let csvContent = ['文本,文件名,行号'];
filesPaths.forEach((path) => {
  const text = fs.readFileSync(path, { encoding: 'utf-8' });
  const fileCsvContent = readChineseContent(text)
    .filter((results) => {
      return results.length > 0;
    })
    .reduce((strs, [lineNumber, words]) => {
      strs.push(
        ...words.map((word) => {
          return `${word},${path},${lineNumber}`;
        }),
      );
      return strs;
    }, []);
  if (fileCsvContent.length) {
    csvContent.push(fileCsvContent.join('\r\n'));
  }
});
fs.writeFileSync(resolve(__dirname, './zhCN.csv'), csvContent.join('\r\n'), {
  encoding: 'utf-8',
});

/**
 *
 * @param text
 * @return <[number,string[]>[]
 */
function readChineseContent(text) {
  return text
    .split(/\r?\n/)
    .map(function (line, index) {
      const match = line.match(
        /[\u2E80-\uA4CF\uF900-\uFAFF\uFE10-\uFE1F\uFE30-\uFE4F\uFF00-\uFFEF]+/g,
      );
      if (!match) {
        return null;
      }
      return [index, match];
    })
    .filter(Boolean);
}
```
