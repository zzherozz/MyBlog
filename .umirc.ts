import { defineConfig } from 'dumi';

export default defineConfig({
  base: '/MyBlog',
  publicPath: '/MyBlog/',
  title: '蓝胖子的网络笔记',
  favicon:
    'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  logo: 'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  outputPath: 'docs-dist',
  mode: 'site',
  hash: true,
  exportStatic: {}, // 将所有路由输出伟html目录结构
  navs: [
    // null, // null 值代表保留约定式生成的导航，只做增量配置
    {
      title: 'GitHub',
      path: 'https://github.com/umijs/dumi',
    },
    {
      title: '胖子的代码生涯',
      // path: '链接是可选的',
      // 可通过如下形式嵌套二级导航菜单，目前暂不支持更多层级嵌套：
      children: [
        { title: '日常记录', path: '/daily-record' },
        // { title: 'leetCode每周迷惑行为', path: '/leet-code' },
        { title: 'JS头秃学习中', path: '/js' },
        { title: '工具类', path: '/utils' },
      ],
    },
  ],
  extraBabelPlugins: [
    [
      'babel-plugin-import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
      },
      'antd',
    ],
  ],
  theme: {
    // 修改 dumi 默认主题的主色，更多变量详见：https://github.com/umijs/dumi/blob/master/packages/theme-default/src/style/variables.less
    '@primary-color': '#1790e4',
  },
});
