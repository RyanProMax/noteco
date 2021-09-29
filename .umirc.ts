import { defineConfig } from 'dumi';

const BASE_URL = '/noteco';

export default defineConfig({
  title: 'noteco',
  favicon: `${BASE_URL}/images/favicon.svg`,
  logo: `${BASE_URL}/images/favicon.svg`,
  outputPath: 'docs-dist',
  // 文档的展现模式：doc | site
  mode: 'site',
  // 由于 GitHub Pages 是非域名根路径部署, base 和 publicPath 配置项需改为【仓库名称】
  // 路由前缀
  base: BASE_URL,
  // 公共路径
  publicPath: `${BASE_URL}/`,
  // 导航
  navs: [
    null, // null 值代表保留约定式生成的导航，只做增量配置
    {
      title: 'Interest',
      path: 'https://ryan-zyy.github.io/interest/'
    },
    {
      title: 'Github',
      path: 'https://github.com/Ryan-zyy/noteco/'
    }
  ],
  exportStatic: {} // 将所有路由输出为 HTML 目录结构，以免刷新页面时 404
});
