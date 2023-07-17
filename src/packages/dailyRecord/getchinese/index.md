---
nav:
  title: Components
  path: /daily-record
---

## 国际化方案详解

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

### 如何获取项目中的中文并生成文档 2.0,并且方便后续维护。

这里不得不拿出新的国际化方案：国际化全流程解决方案 KiWi

#### kiwi 的功能&优点介绍

[Kiwi-国际化全流程解决方案](https://github.com/alibaba/kiwi)

#### 准备工作

- 将准备 i18n 文件夹，注意：i18n/lang/语言映射文件夹 中语言映射文件夹中的文件需删除， 保证为空文件夹
- @ext:zwenjian.vscode-i18n-linter vscode 插件默认提取中文的位置修改为项目自定义位置
- 配置命令，方便后续执行。

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

- 步骤一：全局安装 kiwi-clis 和 kiwi-intl，安装 vscode 插件 kiwi linter

```javascript
yarn global add kiwi-clis@1.0.23 && yarn add kiwi-intl
```

- 步骤二：初始化项目，生成 kiwi 的配置文件 kiwi-config.json ，注意选中 i18n 自己准备的文件夹（ 第一个提示输入 y 按回车, 第二个提示输入 ./i18n/lang） ---[开发者申请百度翻译地址](https://fanyi-api.baidu.com/manage/developer)

```javascript

kiwi --init

```

- 步骤三：@ext:zwenjian.vscode-i18n-linter vscode 插件默认提取中文的位置修改为项目自定义位置
- 把修改 tsconfig 文件中的 "jsx": "react-jsx",改成"jsx": "react"，isolatedModules，skipLibCheck,esModuleInterop 配置或者改成 false。避免执行翻译命令的时候报一些看不明白的错误。
- tsconfig.json 及 webpack 配置中设置好 kiwi-config.json 中 importI18N 对应 的 alias
- package.json 中 scripts 添加 以下 script

- 步骤四：一键批量替换指定文件夹下的所有中文文案

  ```html
  kiwi --extract [dirPath] //踩坑点：模板字符串嵌套异常
  ```

- 步骤五：导出未翻译的文案（可选）

  ```javascript
  kiwi --export
  # 导出指定语言的文案，lang取值为配置中distLangs值，如en-US导出还未翻译成英文的中文文案
  kiwi --export tmp/toEN_Translated.xlsx en-US

  // 踩坑点：提前把导出的文件夹建立好
  ```

- 步骤六：全量翻译未翻译的中文文案，翻译结果自动导入 en-US zh-TW 等目录（全局翻译，尽量只使用一次，否则会替换）注意：翻译之前一定要检查好中文文件是否正确

  ```
  kiwi --translate

  // 踩坑点一： 翻译文件中有的key值翻译的内容直接是错位的
  // 踩坑点二： 翻译未成功，还是中文
  // 踩坑点三：翻译报错，手动处理比较复杂的字符串
  ```

- 步骤七：导入翻译文案，将翻译人员翻译的文案，导入到项目中（可选）
- ```javascript
  kiwi --import
  kiwi --import tmp/toEN_Translated.xlsx en-US

  // 踩坑点: 注意翻译文件里面的换行，中文字符等
  ```

- vlookup 函数

### 好用的插件分享

var-translate-en （主要用于翻译英文或者一些命名方式，类似于驼峰，大写常量等） opencclint（翻译繁体）

### 总结

kiwi 对于中途需要加入国际化的项目和配合专业翻译团队的需求非常友好。

- 优点：

1. 自动提取一键翻译
2. 开发体验好，文件中可以看到对应的中文

- 缺点：

1. 新开发模块翻译麻烦（extract 后采用导入导出方式翻译，或者使用 kiwi --mock 复制到对应文件）
2. kiwi --sync 同步后竟然是中文，kiwi --mock 不好用
3. 目前只支持 ts
4. 文档简陋
