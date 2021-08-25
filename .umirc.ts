import { defineConfig } from 'dumi';

const BASE_URL = '/noteco';

export default defineConfig({
  title: 'noteco',
  favicon: BASE_URL + '/images/favicon.png',
  logo: BASE_URL + '/images/favicon.png',
  // 文档的展现模式：doc | site
  mode: 'site',
  // 由于 GitHub Pages 是非域名根路径部署, base 和 publicPath 配置项需改为【仓库名称】
  // 路由前缀
  base: BASE_URL,
  // 公共路径
  publicPath: BASE_URL + '/',
  // 导航
  navs: [
    null, // null 值代表保留约定式生成的导航，只做增量配置
    {
      title: 'Github',
      path: 'https://github.com/LuckyAyan/noteco',
    },
  ],
  alias: {
    '@': '/src',
  },
  // 需要自定义侧边菜单的路径，没有配置的路径还是会使用自动生成的配置
  menus: {},
});
