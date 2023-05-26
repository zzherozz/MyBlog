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
  exportStatic: {}, // 将所有路由输出html目录结构
  navs: [
    // null, // null 值代表保留约定式生成的导航，只做增量配置
    // {
    //   title: 'GitHub',
    //   path: 'https://github.com/umijs/dumi',
    // },
    {
      title: '前端',
      path: '/js',
    },
    { title: '日常踩坑笔记', path: '/daily-record' },
    { title: '工具类', path: '/utils' },
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
