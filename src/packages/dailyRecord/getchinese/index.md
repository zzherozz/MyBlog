---
nav:
  title: Components
  path: /daily-record
---

## 多语言工作那些事情

### 如何快速获取项目中的中文并生成文档 1.0

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

### 如何获取项目中的中文并生成文档 2.0,并且方便后续维护

这里不得不拿出新的国际化方案：国际化全流程解决方案 KiWi

#### kiwi 的功能&优点介绍

[Kiwi-国际化全流程解决方案](https://github.com/alibaba/kiwi)

#### 准备工作

- 将准备 i18n 文件夹，注意：i18n/lang/语言映射文件夹 中语言映射文件夹中的文件需删除， 保证为空文件夹
- 全局安装 kiwi-clis 和 kiwi-intl，安装 vscode 插件 kiwi linter

```javascript
yarn global add kiwi-clis@1.0.23 && yarn add kiwi-intl
```

- 初始化项目，生成 kiwi 的配置文件 kiwi-config.json ，注意选中 i18n 自己准备的文件夹（ 第一个提示输入 y 按回车, 第二个提示输入 ./i18n/lang） ---[开发者申请百度翻译地址](https://fanyi-api.baidu.com/manage/developer)

```javascript
kiwi --init
```

- @ext:zwenjian.vscode-i18n-linter vscode 插件默认提取中文的位置修改为项目自定义位置
- 把修改 tsconfig 文件中的 "jsx": "react-jsx",改成"jsx": "react"，isolatedModules，skipLibCheck,esModuleInterop 配置或者改成 false。避免执行翻译命令的时候报一些看不明白的错误。
- tsconfig.json 及 webpack 配置中设置好 kiwi-config.json 中 importI18N 对应 的 alias
- package.json 中 scripts 添加 以下 script

```javascript
 "scripts": {
   "kiwi_init": "kiwi --init",
    "kiwi_extract": "kiwi --extract src",
    "kiwi_translate": "kiwi --translate",
    "kiwi_import": "kiwi --import tmp/toEN_Translated.xlsx en-US",
    "kiwi_export": "kiwi --export tmp/toEN_Translated.xlsx en-US",
    "renameJsToTs": "node i18n/renameJsToTs.js",
    "recoverTsToJs": "node i18n/recoverTsToJs.js"
    }
```
