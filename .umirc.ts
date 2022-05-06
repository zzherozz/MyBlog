import { defineConfig } from 'dumi';
const BASE_URL = '/MyBlog/';
// const isPro = process.env.NODE_ENV === 'production';
// const baseUrl = isPro ? BASE_URL : '/';
export default defineConfig({
  base: BASE_URL,
  publicPath: BASE_URL,
  title: 'myblog',
  favicon:
    'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  logo: 'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  outputPath: 'docs-dist',
  mode: 'site',
  history: {
    type: 'hash', // 设置路由模式为 hash 模式，防止部署至 GitHub Pages 后刷新网页后出现 404 的情况发生.
  },
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
        { title: '日常记录', path: '/guide' },
        { title: 'leetCode每周迷惑行为', path: '/leetCode' },
        { title: 'JS头秃学习中', path: '/guide' },
        { title: 'React学习指南', path: '/guide' },
      ],
    },
  ],
  
  // '/guide': [
  //   {
  //     title: '菜单项',
  //     path: '菜单路由（可选）',
  //     // children: [
  //     //   // 菜单子项（可选）
  //     //   'guide/index.md', // 对应的 Markdown 文件，路径是相对于 resolve.includes 目录识别的
  //     // ],
  //   },
  // ],
  // resolve:{
  //   includes:['docs', 'packages/pkg/src']
  // }
  // more config: https://d.umijs.org/config
});
