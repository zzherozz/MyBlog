---
nav:
  title: Components
  path: /daily-record
---

## webpack

### 1.webpack 的核心概念

- Entry：入口，Webpack 进行打包的起始点(文件)
- Output：输出，webpack 编译打包生成的 bundle(打包文件)
- Loader：模块加载(转换)器，将非 js、非 json 模块包装成 webpack 能理解的 js 模块
- Plugin：插件，在 Webpack 构建流程中的特定时机插入具有特定功能的代码
- Module：模块，在 Webpack 眼里一切皆模块，默认只识别 js 文件, 如果是其它类型文件利用对应的 loader 转换为 js 模块
- Model:工作模式，可选：开发模式、生产模式

### 2.webpack 配置文件的整体结构

```jsx | pure
module.exports = {
  entry: '', //入口
  output: {}, //输出
  module: { rules: [] }, //配置loader
  plugins: [], //配置plugin
  model: 工作模式,
};
```

### 3.webpack 常用 loader 与 plugin 汇总

    loader:
    	1.【less-loader】:用于将less文件翻译成为css
    	2.【css-loader】：用于将css以CommonJs语法打包到js中
    	3.【style-loader】：用于动态创建一个style标签，将css引入页面
    			备注：上述三个loader一般配合使用，最终实现：翻译less为css，以style标签形式将样式引入页面。

    	4.【file-loader】：提取源代码图片资源，到指定位置，可修改文件名等操作。
    	5.【url-loader】：与file-loader功能几乎一致，优势是可以对图片进行动态转换base64编码（控制limit属性值可以控制阈值）。
    			备注：上述两个loader中url-loader应用比file-loader广泛。
    	6.【esint-loader】：对项目中的js语法进行检查。

    	7.【babel-loader】：将es6语法转换为es5语法
    			备注1：直接使用只能处理简单的语法，Promise等无法处理。
    			备注2：借助polyfill完成高级es6语法的转换，缺点：所有都转换，无法按需转换，生成的js体积大。
    			备注3：使用core-js配合polyfill完成按需转换。

    	8.【postcss-loader配合auto-prefixer】：用于扩展css前缀
    			备注：
    				(1).该loader需要一个.browserslistrc配置文件。
    				(2).该loader要配合autoprefixer库使用。
    				(3).使用的时机为：["css-loader","扩展前缀","less-loader"]


    pulgin：
    	1.【extract-text-webpack-plugin】：用于提取项目中的css,最终合并为一个单独的文件。
    			备注：上述插件需要配合：css-loader、less-loader两个loader使用，css-loader、less-loader处理之后，交给extract-text-webpack-plugin处理。
    	2.【html-webpack-plugin】：自动创建html文件，且自动引入外部资源。配置项如下：
    			 title:"webpack",
    		     filename:"index.html",
    		     template:"./src/index.html"
    		     //用于压缩html
    		      minify:{
                         removeComments:true, //移除注释
                         collapseWhitespace:true}//移除换行
    	3.【clean-webpack-plugin】：清空webpack的输出目录，防止其他文件“乱入”。
    	4.【MiniCssExtractPlugin 】：用于提取css为单独文件
    	5.OptimizeCssAssetsPlugin,用于压缩css
